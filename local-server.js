require('dns').setDefaultResultOrder('ipv4first');
const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.static('public'));
app.use('/lightgallery', express.static(__dirname + '/node_modules/lightgallery'));

app.get('/api/search', async (req, res) => {
    const query = req.query.q;
    const page = parseInt(req.query.page, 10) || 0;

    if (!query) {
        return res.status(400).json({ error: 'Не указан поисковый запрос' });
    }

    try {
        const baseUrl = 'https://' + 'yandex.ru';
        const searchPath = '/images/touch/search';
        const url = new URL(baseUrl + searchPath);

        url.searchParams.set('text', query);
        url.searchParams.set('p', page.toString());

        const controller = new AbortController();
        const timer = setTimeout(() => controller.abort(), 15000);

        let rawHtml = '';
        try {
            const response = await fetch(url, {
                signal: controller.signal,
                headers: {
                    'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1',
                    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
                    'Accept-Language': 'ru-RU,ru;q=0.9',
                    'Connection': 'keep-alive'
                }
            });

            if (!response.ok) {
                throw new Error(`HTTP статус ${response.status}`);
            }

            rawHtml = await response.text();
        } finally {
            clearTimeout(timer);
        }

        const html = rawHtml
            .replace(/&quot;/g, '"')
            .replace(/&amp;/g, '&')
            .replace(/\\u002F/g, '/')
            .replace(/\\\//g, '/');

        const images = [];
        const seenOrigins = new Set();

        const cardRegex = /"origin":\s*\{[^}]*?"url":\s*"([^"]+)"[^}]*?\}[\s\S]{0,2000}?"thumb":\s*\{[^}]*?"url":\s*"([^"]+)"/g;
        let match;

        while ((match = cardRegex.exec(html)) !== null) {
            const [, fullUrl, rawThumbUrl] = match;
            let thumbUrl = rawThumbUrl;

            if (thumbUrl.startsWith('//')) {
                thumbUrl = 'https:' + thumbUrl;
            }

            if (!seenOrigins.has(fullUrl)) {
                seenOrigins.add(fullUrl);
                images.push({
                    id: `${page}-${images.length + 1}`,
                    preview: thumbUrl,
                    full: thumbUrl,
                    original: fullUrl,
                    tags: query
                });
            }
        }

        return res.json({
            total: images.length,
            page: page,
            hasMore: images.length > 0,
            images: images
        });

    } catch (error) {
        console.error('Ошибка поиска:', error.name, error.message);
        return res.status(500).json({ error: 'Ошибка сервера: ' + error.message });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Сервер запущен: http://localhost:${PORT}`);
});
