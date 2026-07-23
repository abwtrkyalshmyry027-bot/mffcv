# تشغيل النسخة الحية
1. أنشئ مشروعًا في Supabase.
2. افتح SQL Editor والصق `supabase-schema.sql` ثم Run.
3. من Authentication > Users أنشئ مستخدمًا بالبريد وكلمة المرور.
4. من Project Settings > Data API انسخ Project URL وPublishable/Anon key.
5. ضع القيم في `config.js`. لا تضع Service Role Key داخل الموقع.
6. ارفع الملفات إلى GitHub ثم انشرها على GitHub Pages أو Vercel.
7. افتح `admin.html` وسجل الدخول.
8. عدّل البيانات وارفع الصور والشهادات ثم اضغط حفظ.

ملاحظة: سياسات RLS الحالية تسمح لأي مستخدم authenticated بإدارة البيانات. لمشروع شخصي بمستخدم واحد هذا مناسب كبداية، لكن يمكن لاحقًا تقييد الإدارة إلى مستخدم محدد عبر auth.uid().
