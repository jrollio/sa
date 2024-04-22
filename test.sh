while read -r line; do
    echo -ne "${line}\t $(curl -I --location ${line} | grep -Ei 'HTTP/')\n" &
done < allLinks.txt >> /tmp/allLinks.out

while read -r line; do
    echo -ne "${line}\t $(curl -v --location ${line} | grep -Ei 'HTTP/')\n" &
done < allLinks.txt >> /tmp/allLinks.out

ifr.src='https://www.austinfitmagazine.com/January-2024/injured-but-not-broken/'