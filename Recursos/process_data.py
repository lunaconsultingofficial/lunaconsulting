
import re
import json

def parse_blog_content(blog_text):
    products = []
    # Split the content by product entries
    entries = re.split(r'#### ', blog_text)[1:] # Skip the first empty split

    for entry in entries:
        lines = entry.strip().split('\n')
        title = lines[0].strip()
        description = ' '.join(lines[1:]).strip()
        products.append({
            'title': title,
            'description': description,
            'images': [],
            'videos': []
        })
    return products

def categorize_files(file_list_text):
    images = []
    videos = []
    for line in file_list_text.split('\n'):
        filename = line.strip()
        if filename.endswith(('.jpg', '.jpeg', '.png', '.gif')):
            images.append(filename)
        elif filename.endswith(('.mp4', '.mov', '.avi', '.webm')):
            videos.append(filename)
    return images, videos

def main():
    with open('/home/ubuntu/blog_content.md', 'r') as f:
        blog_text = f.read()

    with open('/home/ubuntu/nadiua_file_list.txt', 'r') as f:
        file_list_text = f.read()

    products = parse_blog_content(blog_text)
    images, videos = categorize_files(file_list_text)

    # Simple association based on keywords in titles/descriptions and filenames
    # This is a basic approach and might need refinement based on actual content
    for product in products:
        product_keywords = product['title'].lower().split()
        # Add more specific keywords if needed
        if 'porsche' in product['title'].lower():
            product_keywords.append('porsche')
        elif 'mercedes-benz' in product['title'].lower():
            product_keywords.append('mercedes')
            product_keywords.append('benz')
        elif 'rolls-royce' in product['title'].lower():
            product_keywords.append('rolls')
            product_keywords.append('royce')
        elif 'mercedes-maybach' in product['title'].lower():
            product_keywords.append('maybach')
        elif 'yacht' in product['title'].lower():
            product_keywords.append('yacht')
        elif 'koenigsegg' in product['title'].lower():
            product_keywords.append('koenigsegg')
        elif 'ferrari' in product['title'].lower():
            product_keywords.append('ferrari')
        elif 'brabus' in product['title'].lower():
            product_keywords.append('brabus')

        # Associate images
        associated_images = []
        remaining_images = []
        for img in images:
            if any(keyword in img.lower() for keyword in product_keywords):
                associated_images.append(img)
            else:
                remaining_images.append(img)
        product['images'].extend(associated_images)
        images = remaining_images # Update remaining images

        # Associate videos
        associated_videos = []
        remaining_videos = []
        for vid in videos:
            if any(keyword in vid.lower() for keyword in product_keywords):
                associated_videos.append(vid)
            else:
                remaining_videos.append(vid)
        product['videos'].extend(associated_videos)
        videos = remaining_videos # Update remaining videos

    # Add remaining unassociated images and videos as new products
    for img in images:
        products.append({
            'title': f'Imagen sin descripción: {img}',
            'description': 'Esta imagen no fue asociada con una descripción existente.',
            'images': [img],
            'videos': []
        })
    for vid in videos:
        products.append({
            'title': f'Video sin descripción: {vid}',
            'description': 'Este video no fue asociado con una descripción existente.',
            'images': [],
            'videos': [vid]
        })

    with open('/home/ubuntu/consolidated_stock.json', 'w') as f:
        json.dump(products, f, indent=4)

if __name__ == '__main__':
    main()


