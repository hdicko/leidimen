---
date: "2019-11-05T15:45:33+01:00"
description: La solidarite au coeur de mes preocupations
draft: false
title: Aissa Dicko

card:
  devise: "Ma devise est : Liberté - Égalité - Fraternité et Solidarité"
  image: images/aissa-logo.jpg
  membre: Membre fondateur - President de Leidimen
  presentation: Presidente de leidimen
  type: membre

cascade:
  banner: img/leidimen-logo.jpg

image: img/leidimen-logo.jpg

categories_weight: 10
# Taxonomies
categories:
  - gauche
  - leidimen
  - CA
tags:
  - Bondoufle
tags_weight: 10

weight: 10

slug: Aissa
resources:
  - src: "example.jpg"
    params:
      licence: MIT
      caption: "Some more information about this image"
---

{{< myimage src="images/aissa-logo.jpg" >}}

---

- Presidente de Leidimen
- Membre fondatrice

{{< myshortcode bg-info  >}}

  <div class="container px-4">
    <div class="row gx-5">
    <div class="col">
        <div class="p-3 border bg-info border-0 text-center">{{< photo >}} </div>
      </div>
    </div>
  </div>
{{</myshortcode>}}
