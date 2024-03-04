import requests
from bs4 import BeautifulSoup

url = 'https://www.linkedin.com/school/psg-institute-of-technology-and-applied-research/people/'
response = requests.get(url)

if response.status_code == 200:
    html_content = response.text
else:
    print('Failed to fetch the webpage')
    exit()

soup = BeautifulSoup(html_content, 'html.parser')

follower_count_element = soup.find(
    'div', class_='org-top-card-module__followers-count')
if follower_count_element:
    follower_count = follower_count_element.text.strip()
else:
    follower_count = 'Unknown'

print('Follower count:', follower_count)
