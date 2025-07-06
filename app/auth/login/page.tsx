import LoginForm from '../../../components/auth/LoginForm'
import Image from 'next/image'

export default function LoginPage() {
  return (
    <div className="flex h-screen w-screen">
      <div className="w-1/2 h-full relative bg-gray-100">
        <Image
          src="https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8c3BvcnRzfGVufDB8fDB8fHww"
          alt="logo"
          fill
          className="object-cover"
          priority
        />
      </div>
      <div className="w-1/2 h-full flex justify-center items-center p-8 bg-white">
        <LoginForm />
      </div>
    </div>
  )
}