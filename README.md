✅ აპლიკაციის დასტარტვა:

    • ✅ npm install

    • ✅ npm run start 

    • ✅ npm run mock-server - უნდა დაისტარტოს დამოუკიდებელ ტერმინალში.

✅ სატესტო მომხმარებლები:

    • ✅ email: admin@gmail.com, password: admin123

    • ✅ email: user@gmail.com, password: user123 

    • ✅ დანარჩენ სატესტო მომხმარებლებზე ინფორმაციის ნახვა შეგიძლიათ mock-server/db.json-ში


✅ შესრულებული ფუნქციონალი
1. მომხმარებილის დეშბორდი:  
   • ✅ რეგისტრაციის ფორმა (username, email, password)  
   • ✅ ავტორიზაციის ფორმა (email, password)  
   • ✅ როლების დაფუგნებზე წვდომის კონტროლი (Admin და User როლები)  
   • ✅ მომხმარებთანთა სია – სიას ხედავს როგორც ადმინისტრატორი, ასევე მომხმარებელი.  
   • ✅ მომხმარებელთა სია მოქმედებების ღილაკებით - დეტალების ნახვა, რედაქტირება(ადმინისტრატორი), წაშლა(ადმინისტრატორი).  
   • ✅ მომხმარის დეტალები – დეტალების ნახვა სხვა რაუტზე გადასვლით.  
   • ✅მომხმარებლის დამატება - ადმინისტრატორს შეუძლია დაამატოს მომხმარებელი თავისი ანგარიშიდან.  
   • ✅ საკუთარი პაროლის შეცვლა (მომხმარებელი, ადმინისტრატორი),  
   • ✅ სხვისი პაროლის შეცვლა (ადმინისტრატორი)

2. Route Guards და წვდომის კონტროლი  
   • ✅ Route Guard-ები და UI-ზე წვდომის შეზღუდვა. ავტორიზაციის გარეშე შესვლა ვერ მოხერხდება ვერცერთ როუტზე.

3. Angular & TypeScript  
   • ✅ გამოყენებულია უახლესი Angular 19 და TypeScript.  
   • ✅ სტრუქტურა აწყობილია კომპონენტებსა და სერვისებზე დაყრდნობით.

4. ფორმები & ნავიგაცია  
   • ✅ რეგისტრაციისა და ავტორიზაციის ფორმები აგებულია Reactive Forms-ით.  
   • ✅ გამოყენებულია Angular Router გვერდებს შორის გადასასვლელად + lazy loading.  
   • ✅ გამოყენებულია shared კომპონენტები რეგისტრაცია-ავტორიზაციაზე & საკუთარი და სხვისი პაროლის ცვლილებაზე.

5. HTTP კომუნიკაცია და Backend  
   • ✅ გამოყენებულია HttpClient სერვერთან დასაკავშირებლად  
   • ✅ back-end ლოგიკა მოთავსებულია mock-server საქაღალდეში. გამოყენებულია json-server და Custom Express Middleware (server.js):  
    /login, /register, /changePassword, /admin/changePassword, /promote  
   • ✅ პაროლის ცვლილების და როლის მართვის ლოგიკა back-end-ზე.

6. შეცდომების დამუშავება & UX  
   • ✅ გამოყენებულია ანგულარ მატერიალის SnackBar-ები წარმატების/შეცდომის შეტყობინებების გამოსატანად.  
   • ✅ Tooltip-ები შეზღუდული წვდომის ღილაკებზე.

7. Signals & Change Detection  
   • ✅ გამოყენებულია Angular Signals სთეითის სამართავად.  
   • ✅ გამოყენებულია OnPush ChangeDetection პერფორმანსისთვის.

8. სტილი და თემა  
   • ✅ გამოყენებულია TailwindCSS UI-ისთვის.  
   • ✅ ინტერფეისი აწყობილია Angular Material-ით.

9. Responsiveness & UX  
   • ✅ აპლიკაცია არის რესპონსივი.

10. საუკეთესო პრაქტიკები  
    • ✅ გამოყენებულია TypeScript-ის ტიპები და ინტერფეისები  
    • ✅ გამოყენებულია shared & re-usable კომპონენტები

---

🚀 გამოყენებული ტექნოლოგიები:  
-Angular 19

-TypeScript

-RxJS

-Angular Router

-Angular Reactive Forms

-Angular HttpClient

-Angular Signals

-Angular Material

-Tailwind CSS

-JSON Server

-Custom Express Middleware (server.js)

-OnPush Change Detection

-Lazy Loading
