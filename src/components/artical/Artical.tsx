"use client"
import React from 'react'
import Avatar from '../Avatar'
import ChatSvg from '/public/svg/chat.svg';
import NotifiSvg from '/public/svg/notification.svg';
import HeartSvg from '/public/svg/heart.svg';
import HeartAnim from '/public/anim/heart.json';
import IconButton from '../button/IconButton';
import Lottie from 'lottie-react';
import AvatarGroup from '../avatar/AvatarGroup';

function Artical() {
    return (
        <div className="artboard artboard-horizontal bg-base-100 phone-6 !h-auto rounded">
            <div className="flex flex-col p-4 md:flex-row ">
                {/* <Avatar /> */}
                <div className="flex-1 ml-4">
                    <div className="flex items-center justify-between">
                        <h2 className="text-lg font-bold">John Doe</h2>
                        <div className="flex items-center">
                            <button className="btn btn-primary btn-sm mr-2">Like</button>
                            <button className="btn btn-secondary btn-sm">Share</button>
                        </div>
                    </div>
                    <figure className="w-full mt-4">
                        <img src="https://picsum.photos/500/300" alt="Post image" className="rounded-lg" />
                    </figure>
                    <div className="mt-4">
                        <p className="text-slate-500">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod nunc et libero suscipit, vitae euismod orci tincidunt. Sed nec nunc lobortis, ultrices purus in, euismod nunc. Maecenas euismod, dui in aliquam venenatis, lectus nisi fermentum tellus, vel vulputate nulla felis non risus. Nulla facilisi. Nulla facilisi. Nulla facilisi. Nulla facilisi. Nulla facilisi. Nulla facilisi. Nulla facilisi. Nulla facilisi. Nulla facilisi. Nulla facilisi. Nulla facilisi. </p>
                        <div className="flex items-center justify-between mt-4">
                            <p className="text-slate-500">3 hours ago</p>
                            <div className="flex items-center">
                                <IconButton>
                                    <Lottie animationData={HeartAnim} loop={true} className='size-24 absolute z-10' />
                                    {/* <HeartSvg className="absolute z-10 stroke-base-100" /> */}
                                </IconButton>
                                <IconButton>
                                    <ChatSvg className="fill-primary" />
                                </IconButton>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='flex justify-between items-center px-4 mb-3'>
                <div>content1</div>
                <AvatarGroup />
            </div>
        </div>
    )
}

export default Artical
