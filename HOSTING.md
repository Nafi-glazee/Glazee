# GLAZEE v22 — /admin এবং /mod

আপনার বর্তমান hosting Vercel। এই ZIP খুলে Glazee-main folder-এর সব ফাইল আগের website files-এর জায়গায় দিন, তারপর Vercel-এ নতুন করে Deploy করুন। শুধু admin.html ও mod.html বদলালে হবে না; vercel.json-ও অবশ্যই দিতে হবে। Vercel-এর Root Directory যেন সেই folder হয় যেখানে index.html ও vercel.json আছে।

এরপর খুলুন:
- https://glazeebd.com/admin
- https://glazeebd.com/mod

পুরনো /admin.html ও /mod.html ঠিকানাও ছোট ঠিকানায় চলে যাবে। Login, order ও stock-এর আগের কাজ অপরিবর্তিত। এই ঠিকানা পরিবর্তনের জন্য আলাদা SQL দরকার নেই।

অন্য hosting: Apache/cPanel-এ hidden .htaccess-সহ সব ফাইল দিন। Netlify/Cloudflare Pages-এ _redirects দিন।

Lovable preview-তে /admin ও /mod আগেই আছে। নিজের hosting-এ এই ZIP-এর নতুন files deploy না করা পর্যন্ত ছোট ঠিকানাগুলো চালু হবে না।