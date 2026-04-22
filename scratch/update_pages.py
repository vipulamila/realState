import os

pages_dir = 'pages'
for filename in os.listdir(pages_dir):
    if filename.endswith('.html'):
        filepath = os.path.join(pages_dir, filename)
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Replace filename
        content = content.replace('real-estate-website.html', 'index.html')
        
        # Clean up logo links if they have inline styles from previous attempts
        content = content.replace('<a href="../index.html" style="text-decoration:none; color:inherit;">', '<a href="../index.html" class="nav-logo">')
        
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)

print("Updated all pages.")
