"use client"

import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { cn } from "@/lib/utils"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, X } from 'lucide-react'
import themeConfig from '@/configs/themeConfig'
import { useHistory } from 'react-router-dom'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false)
    const history = useHistory()


    const redirectToSignIn = () => {
       history.push("/login")
    }

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="mx-2 flex h-14 items-center">
                <div className="mr-4 flex">
                    <Link href="/home" to="/home" className="mr-6 flex items-center space-x-2">
                        <svg
                            className="h-6 w-6 text-blue-500"
                            fill="none"
                            height="24"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                            width="24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />
                        </svg>
                        <span className="hidden font-bold sm:inline-block">
                            {themeConfig.app.appName}
                        </span>
                    </Link>
                </div>
                <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
                    <div className="w-full flex-1 md:w-auto md:flex-none">
                        <NavigationMenu className="hidden md:flex">
                            <NavigationMenuList>
                                <NavigationMenuItem>
                                    <NavigationMenuTrigger>Product</NavigationMenuTrigger>
                                    <NavigationMenuContent>
                                        <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                                            <li className="row-span-3">
                                                <NavigationMenuLink asChild>
                                                    <a
                                                        className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                                                        href="/"
                                                    >
                                                        <div className="mb-2 mt-4 text-lg font-medium">
                                                            Careerflow.ai
                                                        </div>
                                                        <p className="text-sm leading-tight text-muted-foreground">
                                                            Optimize your job search and career growth with AI-powered tools.
                                                        </p>
                                                    </a>
                                                </NavigationMenuLink>
                                            </li>
                                            <ListItem href="/kanban" title="Kanban Board">
                                                Organize your job applications efficiently.
                                            </ListItem>
                                            <ListItem href="/skills" title="Skill Insights">
                                                Analyze and improve your professional skills.
                                            </ListItem>
                                            <ListItem href="/import" title="One Click Import">
                                                Easily import job listings from various sources.
                                            </ListItem>
                                        </ul>
                                    </NavigationMenuContent>
                                </NavigationMenuItem>
                                <NavigationMenuItem>
                                    <NavigationMenuTrigger>Services</NavigationMenuTrigger>
                                    <NavigationMenuContent>
                                        <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                                            {services.map((service) => (
                                                <ListItem
                                                    key={service.title}
                                                    title={service.title}
                                                    href={service.href}
                                                >
                                                    {service.description}
                                                </ListItem>
                                            ))}
                                        </ul>
                                    </NavigationMenuContent>
                                </NavigationMenuItem>
                                <NavigationMenuItem>
                                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                        Resources
                                    </NavigationMenuLink>
                                </NavigationMenuItem>
                                <NavigationMenuItem>
                                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                        For Organizations
                                    </NavigationMenuLink>
                                </NavigationMenuItem>
                                <NavigationMenuItem>
                                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                        Company
                                    </NavigationMenuLink>
                                </NavigationMenuItem>
                            </NavigationMenuList>
                        </NavigationMenu>
                    </div>
                    <nav className="flex items-center space-x-1">
                        <Button onClick={redirectToSignIn} className="hidden md:flex">Sign In</Button>
                        <Sheet open={isOpen} onOpenChange={setIsOpen}>
                            <SheetTrigger asChild>
                                <Button
                                    variant="ghost"
                                    className="h-9 w-9 p-0 md:hidden"
                                >
                                    <Menu className="h-5 w-5" />
                                    <span className="sr-only">Toggle menu</span>
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="right" className="pr-0">
                                <MobileNav />
                            </SheetContent>
                        </Sheet>
                    </nav>
                </div>
            </div>
        </header>
    )
}

const MobileNav = () => {
    return (
        <div className="flex flex-col space-y-4 p-4">
            <a href="/" className="flex items-center space-x-2">
                <svg
                    className="h-6 w-6 text-blue-500"
                    fill="none"
                    height="24"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    width="24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />
                </svg>
                <Link href="/home" className="font-bold">{themeConfig.app.appName}</Link>
            </a>
            <nav className="flex flex-col space-y-2">
                <a href="#" className="text-lg font-medium">Product</a>
                <a href="#" className="text-lg font-medium">Services</a>
                <a href="#" className="text-lg font-medium">Resources</a>
                <a href="#" className="text-lg font-medium">For Organizations</a>
                <a href="#" className="text-lg font-medium">Company</a>
            </nav>
            <Button className="w-full">Sign In</Button>
        </div>
    )
}

const ListItem = React.forwardRef(({ className, title, children, ...props }, ref) => {
    return (
        <li>
            <NavigationMenuLink asChild>
                <a
                    ref={ref}
                    className={cn(
                        "block select-none   space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                        className
                    )}
                    {...props}
                >
                    <div className="text-sm font-medium leading-none">{title}</div>
                    <p className="line-clamp-2 text-sm leading-snug   
   text-muted-foreground">
                        {children}
                    </p>
                </a>
            </NavigationMenuLink>
        </li>
    );
});
ListItem.displayName = "ListItem"

const navigationMenuTriggerStyle = () =>
    cn(
        "group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"
    )

const services = [
    {
        title: "Resume Review",
        href: "/services/resume-review",
        description: "Get expert feedback on your resume.",
    },
    {
        title: "Interview Preparation",
        href: "/services/interview-prep",
        description: "Practice and improve your interview skills.",
    },
    {
        title: "Career Coaching",
        href: "/services/career-coaching",
        description: "Personalized guidance for your career growth.",
    },
    {
        title: "Job Search Strategy",
        href: "/services/job-search-strategy",
        description: "Develop an effective plan for your job search.",
    },
]

export default Navbar