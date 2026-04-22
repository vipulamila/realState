import os

pages_dir = r'c:\Users\vipul\OneDrive\Desktop\RealStateWebsite\pages'
fix = 'position: relative; z-index: 1; '

for filename in os.listdir(pages_dir):
    if filename.endswith('.html'):
        filepath = os.path.join(pages_dir, filename)
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Check if already fixed
        if 'position: relative; z-index: 1;' in content:
            continue
            
        new_content = content.replace('.content-section {', '.content-section { position: relative; z-index: 1; ')
        
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"Fixed {filename}")
