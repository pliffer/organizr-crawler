# Organizr Crawler

---

## Usage

30 heavier folders: `$ node organizr-crawler.js ~/Downloads --size`


50 heavier folders: `$ node organizr-crawler.js ~/Downloads --size -c 50`

50 heavier folders and its files: `$ node organizr-crawler.js ~/Downloads --size --files -count 50`

50 heavier folders and its folders: `$ node organizr-crawler.js ~/Downloads --size --folders -count 50`

Output on a file at ./outputs: `$ node organizr-crawler.js ~/Downloads -o`

Output on a file at ./outputs with name Downloads: `$ node organizr-crawler.js ~/Downloads -o -n downloads`