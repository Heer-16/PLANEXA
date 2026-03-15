#!/usr/bin/env python3
"""
Planexa Build Script
====================
Run this after editing any file in js/ or css/ to rebuild planexa.html.
Usage: python3 build.py
"""
import re, os

BASE = os.path.dirname(os.path.abspath(__file__))

print("Building planexa.html...")

# Read all source files
with open(f'{BASE}/css/style.css') as f: css = f.read()
with open(f'{BASE}/js/data.js') as f: data_js = f.read()
with open(f'{BASE}/js/core.js') as f: core_js = f.read()
with open(f'{BASE}/js/views-admin.js') as f: views_admin = f.read()
with open(f'{BASE}/js/views-org.js') as f: views_org = f.read()
with open(f'{BASE}/js/views-shared.js') as f: views_shared = f.read()
with open(f'{BASE}/js/views-features.js') as f: views_features = f.read()
with open(f'{BASE}/js/actions.js') as f: actions = f.read()

# Start from a template or rebuild the HTML shell
# Read the current planexa.html and extract just the HTML shell (head + body without inline css/js)
with open(f'{BASE}/planexa.html') as f: html = f.read()

# Remove existing inline <style> blocks (but keep firebase <script>)
html = re.sub(r'<style>.*?</style>', f'<style>\n{css}\n</style>', html, flags=re.DOTALL)

# Remove existing inline JS script blocks (keep only firebase block which is < 2KB)
# Replace big script blocks with fresh ones
def replace_big_scripts(html, new_js):
    # Remove all <script> blocks larger than 5000 chars (these are our app scripts)
    html = re.sub(r'<script>(?!</script>).{5000,?}</script>', '', html, flags=re.DOTALL)
    # Add fresh scripts before </body>
    html = html.replace('</body>', new_js + '\n</body>')
    return html

combined_scripts = '\n'.join([
    f'<script>\n{data_js}\n</script>',
    f'<script>\n{core_js}\n</script>',
    f'<script>\n{views_admin}\n</script>',
    f'<script>\n{views_org}\n</script>',
    f'<script>\n{views_shared}\n</script>',
    f'<script>\n{views_features}\n</script>',
    f'<script>\n{actions}\n</script>',
])

html = replace_big_scripts(html, combined_scripts)

with open(f'{BASE}/planexa.html', 'w') as f:
    f.write(html)

print(f"✅ planexa.html rebuilt ({len(html)//1024}KB)")
print("   Open planexa.html directly in any browser — no server needed!")
