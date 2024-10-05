import React from 'react'
import Image from 'next/image';

const About: React.FC = () => {
    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
            <div className="flex-1">
                <h1 className="text-4xl font-bold mb-4">About me</h1>
                <p className="text-lg">My name is Sebastian. I am unemployed and live with my parents. If you understand this reference, then we will get along. As a recent graduate of electronics engineering tech, I am exploring what to do with my life. This blog is that, my record on my journey through life. I will be exploring new technologies and writing articles on a quest to find my meaning. Thank you for reading and join me on my journey.</p>
            </div>
            <div className="ml-8">
                <Image
                    src="/SebDoesMedia.png" // Replace with your image path
                    alt="Profile"
                    width={300}
                    height={300}
                    className="rounded-full"
                />
            </div>
        </div>
    );
};

export default About;