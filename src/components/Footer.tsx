import React from 'react'
import { FaGithub, FaInstagram } from 'react-icons/fa'

const Footer: React.FC = () => {
  return (
    <footer className="bg-blueGray-200 pt-8 pb-6 w-full">
      <div className="container mx-auto px-4">
        <hr className="my-6 border-blueGray-600" />
        <div className="flex flex-wrap text-left lg:text-left justify-center">
          <div className="w-full lg:w-6/12 px-4">
            <h4 className="text-3xl font-semibold text-blueGray-700">
              웹보안프로그래밍 포트폴리오
            </h4>
            <h5 className="text-lg mt-0 mb-2 text-blueGray-600">
              92015489 최경규
            </h5>
          </div>
          <div className="w-full lg:w-6/12 px-4">
            <div className="flex flex-wrap items-top mb-6 justify-center">
              <div className="w-full lg:w-4/12 px-4 ml-auto">
                <span className="block uppercase text-blueGray-500 text-sm font-semibold mb-2">
                  소셜 링크
                </span>
                <ul className="list-unstyled text-center">
                  <li>
                    <a
                      className="text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-2 text-sm"
                      href="https://github.com/rudrb?tab=repositories"
                      rel="noopener noreferrer"
                    >
                      <FaGithub className="mr-2 text-black" size={24} />
                      GitHub
                    </a>
                  </li>
                  <li>
                    <a
                      className="text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-2 text-sm"
                      href="https://instagram.com"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FaInstagram className="mr-2 text-black" size={24} />
                      Instagram
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <hr className="my-6 border-blueGray-300" />
        <div className="flex flex-wrap items-center md:justify-between justify-center">
          <div className="w-full md:w-4/12 px-4 mx-auto text-center">
            <div className="text-sm text-blueGray-500 font-semibold py-1">
              @ 중부대학교 웹보안프로그래밍{' '}
              <span id="get-current-year"> 2024</span> Gyu
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
