const express = require('express');
const path = require('path');
const app = express();

// WebGL Build 디렉토리 설정
const buildPath = path.join(__dirname, 'index/Build');
const templatePath = path.join(__dirname, 'index/TemplateData');

// 정적 파일 서빙
app.use(express.static(buildPath, {
    setHeaders: (res, filePath) => {
        if (filePath.endsWith('.wasm')) {
            res.setHeader('Content-Type', 'application/wasm'); // .wasm 파일의 MIME 타입 설정
        }
    }
}));

// 추가로 필요한 TemplateData 디렉토리 서빙
app.use('/TemplateData', express.static(templatePath));

// 기본 index.html 서빙
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index/index.html'));
});

// 서버 시작
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});