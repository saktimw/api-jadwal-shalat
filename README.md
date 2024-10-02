
# API Jadwal Shalat

API jadwal shalat yang diambil dari website : 
[Bimas Islam - Kemenag](https://bimasislam.kemenag.go.id/jadwalshalat). 

dibuat dengan menggunakan framework `Elysia JS` dengan runtime `Bun JS`

#### Dependency :
* Bun JS - [Instalasi](https://bun.sh/docs/installation)

## Installation
* **Install package  :**
```bash
    bun install
```
* **untuk menjalankan mode dev :**
```bash
    bun run dev
```
* **untuk menjalankan mode production :**
```bash
    bun run build
    bun start
```

## API Specification :
### List Provinsi
Request :
- Method : GET
- Endpoint : `/regional/province`
- Query Parameter :
    - search : String

Response :

```json 
{
    "status": "OK",
    "data": [
        {
            "label": "abc123",
            "value": "XXXXX"
        },
        ...
    ]
}
```

### List Kabupaten
Request :
- Method : GET
- Endpoint : `/regional/regency/{:province_id}`

Response :

```json 
{
    "status": "OK",
    "data": [
        {
            "label": "abc123",
            "value": "XXXXX"
        },
        ...
    ]
}
```
### List Jadwal Shalat
Request :
- Method : GET
- Endpoint : `/jadwal`
- Query Parameter :
    - province : String (diambil dari value list provinsi)
    - regency : String (diambil dari value list kabupaten)
    - month : String, ( exp : 12) 
    - year : String, ( exp : 2024 )

Response :

```json 
{
    "status": "OK",
    "province": {
        "id": "abc123",
        "name": "XXXX"
    },
    "regency": {
        "id": "abc123",
        "name": "XXXX"
    },
    "jadwal": {
        "2024-09-01": {
            "imsak": "04:12",
            "subuh": "04:22",
            "terbit": "05:34",
            "dhuha": "06:01",
            "dzuhur": "11:40",
            "ashar": "14:58",
            "maghrib": "17:39",
            "isya": "18:48"
        },
        ...
    }
}
```

### Data Tidak ditemukan
jika data tidak ditemukan berikut responnya :
```json
{
    "status": "Not Found"
}
```