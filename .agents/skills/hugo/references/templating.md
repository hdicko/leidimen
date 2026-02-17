# Hugo Templating

Docs: https://gohugo.io/templates/introduction/
Functions reference: https://gohugo.io/functions/

## Go Template Basics

### Variables and Context

```go-html-template
{{/* The dot (.) is the current context */}}
{{ .Title }}           {{/* Page title */}}
{{ .Content }}         {{/* Page rendered content */}}
{{ .Date }}            {{/* Page date */}}
{{ .RelPermalink }}    {{/* Relative URL */}}
{{ .Params.author }}   {{/* Custom front matter param */}}
{{ site.Title }}       {{/* Site title from config */}}
{{ site.Params.foo }}  {{/* Site params from config */}}

{{/* Assign variables */}}
{{ $title := .Title }}
{{ $count := len .Pages }}

{{/* Reassign */}}
{{ $title = "New Title" }}
```

### Conditionals

```go-html-template
{{ if .Params.featured }}
  <span class="featured">Featured</span>
{{ end }}

{{ if eq .Section "posts" }}
  Blog post
{{ else if eq .Section "docs" }}
  Documentation
{{ else }}
  Other
{{ end }}

{{/* with — executes block if value is truthy, sets context to value */}}
{{ with .Params.subtitle }}
  <h2>{{ . }}</h2>
{{ end }}

{{/* with/else */}}
{{ with .Params.image }}
  <img src="{{ . }}">
{{ else }}
  <img src="/default.jpg">
{{ end }}
```

### Loops

```go-html-template
{{ range .Pages }}
  <h2>{{ .Title }}</h2>
{{ end }}

{{/* With index */}}
{{ range $index, $page := .Pages }}
  <div>{{ $index }}: {{ $page.Title }}</div>
{{ end }}

{{/* Range with else (empty collection) */}}
{{ range .Pages }}
  <h2>{{ .Title }}</h2>
{{ else }}
  <p>No pages found.</p>
{{ end }}
```

### Common Functions

```go-html-template
{{/* String functions */}}
{{ lower .Title }}
{{ upper .Title }}
{{ title .Title }}
{{ truncate 100 .Summary }}
{{ replace .Content "old" "new" }}
{{ strings.TrimPrefix "prefix-" .Title }}
{{ printf "Hello %s" .Title }}
{{ htmlUnescape .Content }}
{{ plainify .Content }}        {{/* Strip HTML */}}

{{/* Collection functions */}}
{{ len .Pages }}
{{ first 5 .Pages }}
{{ last 3 .Pages }}
{{ after 2 .Pages }}
{{ sort .Pages "Date" "desc" }}
{{ uniq $items }}
{{ append $slice $item }}
{{ where .Pages "Section" "posts" }}
{{ where .Pages "Params.featured" true }}
{{ where .Pages "Date" ">" (now.AddDate -1 0 0) }}

{{/* Math */}}
{{ add 1 2 }}
{{ sub 10 3 }}
{{ mul 5 2 }}
{{ div 10 3 }}
{{ mod 10 3 }}
{{ math.Round 3.7 }}
{{ math.Max 5 10 }}

{{/* Comparison */}}
{{ eq .Type "post" }}
{{ ne .Section "docs" }}
{{ gt (len .Pages) 0 }}
{{ le .WordCount 1000 }}

{{/* Logical */}}
{{ and (eq .Section "posts") (not .Draft) }}
{{ or .Params.image .Site.Params.defaultImage }}

{{/* Date formatting (Go reference time: Mon Jan 2 15:04:05 MST 2006) */}}
{{ .Date.Format "2006-01-02" }}              {{/* 2024-03-15 */}}
{{ .Date.Format "January 2, 2006" }}         {{/* March 15, 2024 */}}
{{ .Date.Format "Mon, 02 Jan 2006" }}        {{/* Fri, 15 Mar 2024 */}}
{{ time.Format "2006" now }}                 {{/* Current year */}}

{{/* URL functions */}}
{{ absURL "css/style.css" }}
{{ relURL "images/photo.jpg" }}
{{ .RelPermalink }}
{{ urlize "Hello World" }}                   {{/* hello-world */}}

{{/* Safe output */}}
{{ .Content | safeHTML }}
{{ "color: red;" | safeCSS }}
{{ "alert('hi')" | safeJS }}
```

### Piping

```go-html-template
{{ .Title | lower | truncate 50 }}
{{ .Content | plainify | truncate 160 }}
{{ resources.Get "css/main.css" | minify | fingerprint }}
```

### Scratch (cross-scope variables)

```go-html-template
{{ $scratch := newScratch }}
{{ $scratch.Set "count" 0 }}
{{ range .Pages }}
  {{ if .Params.featured }}
    {{ $scratch.Add "count" 1 }}
  {{ end }}
{{ end }}
<p>Featured: {{ $scratch.Get "count" }}</p>
```

### Context Preservation

When inside `range` or `with`, use `$` to access the top-level page context:

```go-html-template
{{ range .Pages }}
  {{/* . is now a Page in the range */}}
  <a href="{{ .RelPermalink }}">{{ .Title }}</a>
  {{/* $ is the original page context */}}
  <span>From: {{ $.Title }}</span>
{{ end }}
```

## Shortcodes

Docs: https://gohugo.io/templates/shortcode/

### Creating Custom Shortcodes

Place in `layouts/_shortcodes/<name>.html`.

#### Simple shortcode (positional args)

```go-html-template
{{/* layouts/_shortcodes/youtube.html */}}
<div class="video-wrapper">
  <iframe src="https://www.youtube.com/embed/{{ .Get 0 }}"
          allowfullscreen></iframe>
</div>
```

Usage: `{{</* youtube dQw4w9WgXcQ */>}}`

#### Named parameters

```go-html-template
{{/* layouts/_shortcodes/figure.html */}}
<figure{{ with .Get "class" }} class="{{ . }}"{{ end }}>
  {{ $img := .Page.Resources.Get (.Get "src") }}
  {{ with $img }}
    {{ $resized := .Resize "800x webp" }}
    <img src="{{ $resized.RelPermalink }}"
         width="{{ $resized.Width }}"
         height="{{ $resized.Height }}"
         alt="{{ $.Get "alt" }}">
  {{ end }}
  {{ with .Get "caption" }}
    <figcaption>{{ . }}</figcaption>
  {{ end }}
</figure>
```

Usage: `{{</* figure src="photo.jpg" alt="A photo" caption="My photo" */>}}`

#### With inner content

```go-html-template
{{/* layouts/_shortcodes/callout.html */}}
<div class="callout callout-{{ .Get 0 | default "info" }}">
  {{ .Inner | markdownify }}
</div>
```

Usage:
```
{{</* callout "warning" */>}}
This is a **warning** message.
{{</* /callout */>}}
```

### Built-in Shortcodes

```
{{</* figure src="image.jpg" title="Caption" */>}}
{{</* gist user id */>}}
{{</* highlight go */>}} code {{</* /highlight */>}}
{{</* instagram id */>}}
{{</* ref "posts/my-post.md" */>}}
{{</* relref "posts/my-post.md" */>}}
{{</* tweet user id */>}}
{{</* vimeo id */>}}
{{</* youtube id */>}}
```

## Data Templates

Access data files from `data/` directory:

```go-html-template
{{/* data/social.toml contains: [[links]] name="GitHub" url="..." */}}
{{ range site.Data.social.links }}
  <a href="{{ .url }}">{{ .name }}</a>
{{ end }}
```

## Debugging Templates

```go-html-template
{{/* Print variable value */}}
{{ printf "%#v" . }}

{{/* Debug specific value */}}
{{ debug.Dump .Params }}

{{/* Warn in console */}}
{{ warnf "Variable value: %s" .Title }}

{{/* Error and stop build */}}
{{ errorf "Missing required param: %s" "image" }}
```
