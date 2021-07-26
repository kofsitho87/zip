## Docker mongodb
```bash
$ docker run --name mongodb -d -p27017:27017 mongo
```

## nodejs로 시작

```bash
$ npm install
$ npm run start
```


## API
#### API 1. 생성
  * POST /

  body
  ```json
  {
    "address": "서울특별시 강남구 대치동 821",
    "rooms": [
        {
            "tag": "101호",
            "deposit": 1000,
            "monthly": 80
        },
        {
            "tag": "102호",
            "deposit": 3000
        }
    ]
  }
  ```

#### API 2. 수정
  * PUT /:id

  body
  ```json
  {
    "address": "서울특별시 강남구 대치동 822",
    "rooms": [
        {
            "_id": "60fe374abad91e1303f0086e",
            "tag": "101호",
            "deposit": 2000,
            "monthly": 50
        },
        {
            "_id": "60fe399e15c8701388902756",
            "tag": "103호",
            "deposit": 5000,
            "monthly": 100
        }
    ]
  }
  ```

#### API 3. 삭제
  * DELETE /:id

#### API 4. 조회
  * GET /

#### API 5. 집계
  * GET /avg
