import React from 'react'

function Footer() {
    return (
        <footer className="footer bg-base-200 h-60 text-base-content p-10 border-t">
            <nav>
                <h6 className="footer-title">Services</h6>
                <a className="link link-hover">Branding</a>
                <a className="link link-hover">Design</a>
                <a className="link link-hover">Marketing</a>
                <a className="link link-hover">Advertisement</a>
            </nav>
            <nav>
                <h6 className="footer-title">Thông tin</h6>
                <a className="link link-hover">Phone: +84 123 456 789</a>
                <a className="link link-hover">Email: aV0g0@example.com</a>
            </nav>
            <nav>
                <h6 className="footer-title">Điều khoản</h6>
                <a className="link link-hover">Điều khoản sử dụng</a>
                <a className="link link-hover">Chính sách bảo mật</a>
                <a className="link link-hover">Chính sách cookie</a>
            </nav>
            <form>
                <h6 className="footer-title">Đăng ký</h6>
                <fieldset className="form-control w-80">
                    <label className="label">
                        <span className="label-text">Cập nhật tin tức mới nhất</span>
                    </label>
                    <div className="join">
                        <input
                            type="text"
                            placeholder="example@email.com"
                            className="input input-bordered join-item" />
                        <button className="btn btn-primary join-item">Đăng kí</button>
                    </div>
                </fieldset>
            </form>
        </footer>
    )
}

export default Footer
