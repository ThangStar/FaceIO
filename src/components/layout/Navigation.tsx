import clsx from 'clsx'
import React, { HTMLAttributes } from 'react'
import Lottie from "lottie-react";
import HotAnim from '/public/anim/hot.json'
import HomeSvg from '/public/svg/home.svg'
type Props = HTMLAttributes<HTMLDivElement> & {

}
function Navigation({ className }: Props) {
    const [tabSelected, setTabSelected] = React.useState(1)
    const handleSelectedTab = (pos: number) => {
        setTabSelected(pos)
    }
    return (
        <div className={`btm-nav relative w-full ${className} space-x-1`}>
            <button
                onClick={() => handleSelectedTab(1)} className={`${clsx({ 'active ': tabSelected === 1 })} hover:bg-base-100 bg-transparent px-5`} >
                {/* <Lottie animationData={HotAnim} loop={true} className='size-12' /> */}
                <HomeSvg className="fill-base-content"/>
            </button>
            <button onClick={() => handleSelectedTab(2)} className={`${clsx({ 'active ': tabSelected === 2 })} hover:bg-base-100 px-5`} >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            </button>
            <button onClick={() => handleSelectedTab(3)} className={`${clsx({ 'active ': tabSelected == 3 })} hover:bg-base-100 px-5`} >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
            </button>
        </div>
    )
}

export default Navigation
