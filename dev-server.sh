#!/bin/bash
# Development server script for local Hugo development
# This overrides the production baseURL for local development

echo "Starting Hugo development server..."
echo "Local site will be available at: http://localhost:1313"
echo "Press Ctrl+C to stop the server"
echo ""

hugo server -D \
  --baseURL="http://localhost:1313" \
  --bind="127.0.0.1" \
  --port=1313 \
  --disableFastRender \
  --navigateToChanged
