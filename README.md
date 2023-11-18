# Great Blue (Open WMS)

### Open-Source Warehouse Management System

[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![LinkedIn][linkedin-shield]][linkedin-url]

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Netlify Status](https://api.netlify.com/api/v1/badges/59d8de35-75fd-4dbf-b052-e6a90afa70b0/deploy-status)](https://app.netlify.com/sites/greatblue/deploys)
<br />

<div align="center" id="readme-top">
  <a href="https://github.com/infiniteoo/wms">
    <img src="./public/gb_splash_page.png" alt="Logo" width="100%" height="100%">
  </a>

  <h3 align="center">Great Blue</h3>

  <p align="center">
    
  <a href="https://github.com/infiniteoo/wms"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://greatblue.netlify.app">View Demo</a>
    ·
    <a href="https://github.com/infiniteoo/wms/issues">Report Bug</a>
    ·
    <a href="https://github.com/infiniteoo/wms/issues">Request Feature</a>
  </p>
</div>

## Introduction

Great Blue (and it's accompanying mobile app) is an open-source, complete warehouse management system created with Next.js, React/React Native, PostgreSQL, Supabase, and utilizes Clerk to handler user management and authentication.

Features:

- Complete inventory management and tracking
- Processing of inbound and outbound orders
- Mobile app processes orders and arranges inventory via RF scanner gun
- Driver check-in web interface w/mobile app
- Incident Report web interface w/mobile app
- Production timeline monitor
- Door activity monitor
- Inbound/outbound order calendar & scheduler
- Employee work scheduler
- One-click login w/multiple authentication portals (provided by Clerk)
- Dashboards highlighting various relevant statistics
- Generate driver sign-out paperwork into PDF
- Generate pallet tags and shipment plaques with barcodes

## Background

While i continue my search for my first full time coding opportunity, I've been making ends meet by driving a forklift in a warehouse. During my tenure I've found various ways to implement my learned coding knowledge into production by creating a series of tools to help make peoples' lives easier.

## Feature Screenshots

Informative dashboards highlighting various statistics:

 <img src="./public/db-10.png" alt="Logo" width="100%" height="100%">

A sleek and easily-implemented complete authentication system provided by Clerk:

  <img src="./public/db-11.png" alt="Logo" width="100%" height="100%">

An employee analysis tool rich with data and a ranking system:
<img src="./public/db-23.png" alt="Logo" width="100%" height="100%">

A filterable inventory management database:

  <img src="./public/db-13.png" alt="Logo" width="100%" height="100%">

Generate pallet labels with scannable LPN barcodes along with other pallet stats:

  <img src="./public/db-22.png" alt="Logo" width="100%" height="100%">

Generate professional pallet tags to help organize your outbound loads. Includes barcodes for item/quantity/dates/LPN:

  <img src="./public/db-21.png" alt="Logo" width="100%" height="100%">

The door activity monitor keeps track of which loads are being handled in your warehouse:

  <img src="./public/db-16.png" alt="Logo" width="100%" height="100%">
  
Schedule, edit and track all of your incoming and outcoming orders in the calendar:
  
  <img src="./public/db-17.png" alt="Logo" width="100%" height="100%">

The employee scheduler let's employees know what days they are scheduled to work:
<img src="./public/db-18.png" alt="Logo" width="100%" height="100%">

Once a truck is loaded and marked complete, the driver's sign-out paperwork will be ready to generate:

  <img src="./public/db-19.png" alt="Logo" width="100%" height="100%">

Customize your dock door names, colors and total amount:
<img src="./public/db-20.png" alt="Logo" width="100%" height="100%">
A production timeline monitor to keep track of how many units are being produced eventually en route to your warehouse:

  <img src="./public/db-12.png" alt="Logo" width="100%" height="100%">

## Getting Started

- clone the repository
- install dependencies with npm/yarn install

* create a .env.local file in the root of your project
* make sure your .env.local file is being ignored in your .gitignore
* create a Supabase account, a project, and a table in your database
* create columns for the data (refer to /server/models/labRequests for Schema)
* don't forget to set up your RLS policy on the table
* enter your assigned URL and ANON key in the .env.local file:
* NEXT_PUBLIC_SUPABASE_URL=
* NEXT_PUBLIC_SUPABASE_ANON_KEY=

Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Built With

- [![Next][Next.js]][Next-url]
- [![React][React.js]][React-url]

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

<!-- ROADMAP -->

## Roadmap

- [x] Add Changelog
- [x] Add back to top links
- [ ] Add Additional Templates w/ Examples
- [ ] Add "components" document to easily copy & paste sections of the readme
- [ ] Multi-language Support
  - [ ] Chinese
  - [ ] Spanish

See the [open issues](https://github.com/othneildrew/Best-README-Template/issues) for a full list of proposed features (and known issues).

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTACT -->

## Contact

Your Name - [@your_twitter](https://twitter.com/infiniteoo) - troydorman@gmail.com

Project Link: [https://github.com/infiniteoo/wms](https://github.com/infiniteoo/wms)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[contributors-shield]: https://img.shields.io/github/contributors/infiniteoo/wms.svg?style=for-the-badge
[contributors-url]: https://github.com/infiniteoo/wms/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/infiniteoo/wms.svg?style=for-the-badge
[forks-url]: https://github.com/infiniteoo/wms/network/members
[stars-shield]: https://img.shields.io/github/stars/infiniteoo/wms.svg?style=for-the-badge
[stars-url]: https://github.com/infiniteoo/wms/stargazers
[issues-shield]: https://img.shields.io/github/issues/infiniteoo/wms.svg?style=for-the-badge
[issues-url]: https://github.com/infiniteoo/wms/issues
[license-shield]: https://img.shields.io/github/license/infiniteoo/wms.svg?style=for-the-badge
[license-url]: https://github.com/infiniteoo/wms/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/t-wayne-dormann
[product-screenshot]: images/screenshot.png
[Next.js]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[Next-url]: https://nextjs.org/
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[Vue.js]: https://img.shields.io/badge/Vue.js-35495E?style=for-the-badge&logo=vuedotjs&logoColor=4FC08D
[Vue-url]: https://vuejs.org/
[Angular.io]: https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white
[Angular-url]: https://angular.io/
[Svelte.dev]: https://img.shields.io/badge/Svelte-4A4A55?style=for-the-badge&logo=svelte&logoColor=FF3E00
[Svelte-url]: https://svelte.dev/
[Laravel.com]: https://img.shields.io/badge/Laravel-FF2D20?style=for-the-badge&logo=laravel&logoColor=white
[Laravel-url]: https://laravel.com
[Bootstrap.com]: https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white
[Bootstrap-url]: https://getbootstrap.com
[JQuery.com]: https://img.shields.io/badge/jQuery-0769AD?style=for-the-badge&logo=jquery&logoColor=white
[JQuery-url]: https://jquery.com
