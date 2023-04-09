export default function LoginPage(){
    return (
        <div className="mt-4">
            <h1 className="text-4xl text-center">User Login</h1>
            <form className="max-wd-md mx-auto ">
                <input type="email" placeholder="yourname@gmail.com"/>
                <input type="password" placeholder="password"/>
                <button>login</button>
            </form>
        </div>
    ) ;
}