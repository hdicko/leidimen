# Hugo Asset Pipeline

Docs: https://gohugo.io/hugo-pipes/introduction/

Assets in `assets/` are processed by Hugo Pipes. Files in `static/` are copied as-is.

## Image Processing

Docs: https://gohugo.io/content-management/image-processing/

```go-html-template
{{ $image := resources.Get "images/photo.jpg" }}

{{/* Resize — width, height, or both */}}
{{ $resized := $image.Resize "600x" }}          {{/* Width 600, proportional height */}}
{{ $resized := $image.Resize "x400" }}          {{/* Height 400, proportional width */}}
{{ $resized := $image.Resize "600x400" }}       {{/* Exact dimensions */}}

{{/* Fill — crop to exact dimensions */}}
{{ $filled := $image.Fill "800x600 Center" }}   {{/* Anchors: Center, TopLeft, Right, etc. */}}
{{ $filled := $image.Fill "800x600 Smart" }}    {{/* Smart cropping */}}

{{/* Fit — scale to fit within dimensions */}}
{{ $fitted := $image.Fit "1200x800" }}

{{/* Format conversion */}}
{{ $webp := $image.Resize "800x webp" }}
{{ $avif := $image.Resize "800x avif" }}

{{/* Quality */}}
{{ $img := $image.Resize "800x webp q85" }}

{{/* Filters */}}
{{ $blurred := $image.Filter (images.GaussianBlur 5) }}
{{ $bright := $image.Filter (images.Brightness 20) }}
{{ $gray := $image.Filter (images.Grayscale) }}
{{ $overlay := $image.Filter (images.Overlay $watermark 50 50) }}

{{/* Chaining */}}
{{ $processed := $image.Resize "1200x" | images.Filter (images.Brightness 10) }}

{{/* Output */}}
<img src="{{ $resized.RelPermalink }}"
     width="{{ $resized.Width }}"
     height="{{ $resized.Height }}"
     alt="Description">
```

### Responsive Images

```go-html-template
{{ $image := .Resources.Get "cover.jpg" }}
{{ $small := $image.Resize "480x webp" }}
{{ $medium := $image.Resize "800x webp" }}
{{ $large := $image.Resize "1200x webp" }}
{{ $fallback := $image.Resize "800x jpg" }}

<picture>
  <source media="(max-width: 480px)" srcset="{{ $small.RelPermalink }}" type="image/webp">
  <source media="(max-width: 800px)" srcset="{{ $medium.RelPermalink }}" type="image/webp">
  <source srcset="{{ $large.RelPermalink }}" type="image/webp">
  <img src="{{ $fallback.RelPermalink }}"
       width="{{ $fallback.Width }}"
       height="{{ $fallback.Height }}"
       alt="Description" loading="lazy">
</picture>
```

## CSS / Sass

```go-html-template
{{/* Plain CSS — minify and fingerprint */}}
{{ with resources.Get "css/main.css" }}
  {{ $css := . | minify | fingerprint "sha256" }}
  <link rel="stylesheet" href="{{ $css.RelPermalink }}" integrity="{{ $css.Data.Integrity }}">
{{ end }}

{{/* Sass/SCSS */}}
{{ with resources.Get "sass/main.scss" }}
  {{ $opts := dict "transpiler" "dartsass" "outputStyle" "compressed" }}
  {{ $css := . | toCSS $opts | minify | fingerprint }}
  <link rel="stylesheet" href="{{ $css.RelPermalink }}" integrity="{{ $css.Data.Integrity }}">
{{ end }}

{{/* PostCSS */}}
{{ with resources.Get "css/main.css" }}
  {{ $css := . | postCSS (dict "config" "./postcss.config.js") | minify | fingerprint }}
  <link rel="stylesheet" href="{{ $css.RelPermalink }}">
{{ end }}

{{/* Tailwind CSS (v4+) */}}
{{ with resources.Get "css/main.css" }}
  {{ $css := . | css.TailwindCSS | minify | fingerprint }}
  <link rel="stylesheet" href="{{ $css.RelPermalink }}" integrity="{{ $css.Data.Integrity }}">
{{ end }}
```

## JavaScript

```go-html-template
{{/* Bundle with esbuild */}}
{{ with resources.Get "js/main.js" }}
  {{ $opts := dict
    "minify" true
    "target" "es2020"
    "format" "esm"
    "sourceMap" "linked"
  }}
  {{ $js := . | js.Build $opts | fingerprint }}
  <script src="{{ $js.RelPermalink }}" type="module" integrity="{{ $js.Data.Integrity }}"></script>
{{ end }}

{{/* TypeScript */}}
{{ with resources.Get "ts/app.ts" }}
  {{ $js := . | js.Build (dict "target" "es2020" "minify" true) }}
  <script src="{{ $js.RelPermalink }}"></script>
{{ end }}

{{/* Concatenate multiple files */}}
{{ $js1 := resources.Get "js/vendor.js" }}
{{ $js2 := resources.Get "js/app.js" }}
{{ $bundle := slice $js1 $js2 | resources.Concat "js/bundle.js" | minify | fingerprint }}
<script src="{{ $bundle.RelPermalink }}" integrity="{{ $bundle.Data.Integrity }}"></script>
```

## Production vs Development

```go-html-template
{{ $css := resources.Get "css/main.css" }}
{{ if hugo.IsProduction }}
  {{ $css = $css | minify | fingerprint }}
  <link rel="stylesheet" href="{{ $css.RelPermalink }}" integrity="{{ $css.Data.Integrity }}">
{{ else }}
  <link rel="stylesheet" href="{{ $css.RelPermalink }}">
{{ end }}
```

## Remote Resources

```go-html-template
{{ $data := resources.GetRemote "https://api.example.com/data.json" }}
{{ with $data }}
  {{ if .Err }}
    {{ errorf "Fetch failed: %s" .Err }}
  {{ else }}
    {{ $json := .Content | transform.Unmarshal }}
    {{ range $json.items }}
      <div>{{ .title }}</div>
    {{ end }}
  {{ end }}
{{ end }}
```
