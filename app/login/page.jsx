"use client";

const PageUser = () => {
   const handleSubmit = (e) => {
      e.preventDefault();
      const formData = new FormData(e.target);
      const email = formData.get("email");
      const password = formData.get("password");

      console.log(email);
      console.log(password);
      fetchData(email, password)
   };

   const fetchData = async (email, password) => {
      try {
         const response = await fetch('http://localhost:8000/api/user/login/', {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({
               email: email,
               password: password
            })
         })

         const data = await response.json()

         if (!response.ok) {
            console.log('Error', data.message);
         }

         if (response.status === 200) {
            console.log('Success', data.message);
            window.location.href = '/dashboard'
         }

      
      } catch (error) {
         console.log('Error', data.message);
      }
   }

   return (
      <div className="min-h-[100dvh] w-full h-full flex justify-center items-center">
         <form
            className="border-2 rounded-xl text-lg text-black p-4 space-y-4"
            onSubmit={(e) => handleSubmit(e)}
         >
            <input
               className="w-[20rem] outline-none rounded-xl block p-3"
               placeholder="email"
               type="email"
               name="email"
               required
            />
            <input
               className="w-[20rem] outline-none rounded-xl block p-3"
               type="password"
               name="password"
               placeholder="password"
               required
            />
            <input
               className="bg-white block mx-auto rounded-xl px-6 p-2 cursor-pointer"
               type="submit"
               value="Login"
            />
         </form>
      </div>
   );
};

export default PageUser;
