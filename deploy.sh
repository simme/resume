cp -R build/ /tmp/simonljsv
mv /tmp/simonljsv/resume-sv.html /tmp/simonljsv/index.html
rm /tmp/simonljsv/resume-en.html
rsync -avz /tmp/simonljsv/ root@iamsim.me:~/simonljungberg.se/
rm -rf /tmp/simonljsv

cp -R build/ /tmp/simonljen
mv /tmp/simonljen/resume-en.html /tmp/simonljen/index.html
rm /tmp/simonljen/resume-sv.html
rsync -avz /tmp/simonljen/ root@iamsim.me:~/simonljungberg.com/
rm -rf /tmp/simonljen
