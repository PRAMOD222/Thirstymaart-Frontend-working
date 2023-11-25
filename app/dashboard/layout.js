import Dashnav from './Dashnav'

export default function DashboardLayout({ children }) {
    return <section >
        <div className='flex '>
            <Dashnav className="" />
            <div className='ml-[20rem] w-full flex justify-center'>
                {children}
            </div>
        </div>
    </section>
}