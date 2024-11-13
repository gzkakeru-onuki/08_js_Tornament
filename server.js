// 必要なパッケージをインストール
// npm install express axios

const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();
const port = 3000;

// Google APIキー
const MAPS_API_KEY = 'AIzaSyCB3VMT8vLf3K8i4h5oWjoszj2ff_DzaN0';

// CORS設定
app.use(cors());

// 近くの病院情報を取得するエンドポイント
app.get('/getHospitals', async (req, res) => {
    const { lat, lng } = req.query;

    try {
        // Places APIを使用して近くの病院を検索
        const placesUrl = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=5000&type=hospital&key=${MAPS_API_KEY}`;
        const placesResponse = await axios.get(placesUrl);

        // 病院情報が存在する場合
        if (placesResponse.data.results.length > 0) {
            res.json(placesResponse.data);
        } else {
            // 病院情報がない場合
            res.json({ message: '近くの病院は見つかりませんでした。' });
        }
    } catch (error) {
        console.error("病院情報の取得エラー:", error);
        res.status(500).json({ error: '病院情報の取得に失敗しました' });
    }
});

// サーバーを起動
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
