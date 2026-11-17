# Website 1 — B16 + B24 (65 images)

This is the reviewed copy of the original PixPlot 0.0.113 result. The underlying UMAP positions, image feature vectors, atlases, and 7 automatic KMeans groups have not been recomputed or replaced.

## Groups

- **Automatic (KMeans)**: 7 original clusters, from `data/hotspots/hotspot-bfe3c3b8-e273-11f1-9c03-0a555dc3ca8a.json`
- **Human-reviewed**: 10 subject groups and one explicitly uncertain photograph (B16P36) from `data/hotspots/reviewed_subject_groups.json`

The two sidebar buttons switch between group lists, while using the same 65-photo UMAP layout.

Edits approved 17 Nov 2026:
- Group 01 = 村落景觀與鄉郊舊建築 (3)
- Group 02 = 中國傳統宗教建築 (7)
- Group 04 = 民間信仰、風水與鎮護設施 (10); B24P04 kept there with explicit uncertainty about its function
- Group 07 = 鄉郊草地與小徑 (2): B24P06–B24P07
- Group 08 = 泥灘、淺水與岩岸 (9): B24P08–B24P16
- B16P36 = unclassified, pending review

**Important:** The human-reviewed groups describe documentary/semantic subjects, not newly computed machine-learning clusters. All B16 M1 descriptions are from `B16_Metadata_Updated_UTF8.csv`; the B24 set lacks verified, image-level metadata.

## Hosting

`index.html` is at the top level, alongside `assets/` and `data/`.
Serve this directory via HTTP, not the `file://` protocol. For example, run:

`python -m http.server 8001`

Then open `http://127.0.0.1:8001/`.

For GitHub Pages, upload the **contents** of this directory to the repository root and enable Pages from the main branch root. Do not upload only the ZIP as the site.
