import React from 'react'

function Breadcrumbs() {
    return (
        <div className="breadcrumbs h-12 text-sm px-2 md:px-6 py-3 -mt-[34px] absolute z-[18] bg-base-100 w-screen">
            <ul>
                <li><a>Trang chủ</a></li>
                <li><a>Bài đăng mới</a></li>
            </ul>
        </div>
    )
}

export default Breadcrumbs
