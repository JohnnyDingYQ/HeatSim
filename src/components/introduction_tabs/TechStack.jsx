export default function TechStack() {
  return (
    <p className='main'>
      <strong>React</strong>
      {"\nI appreciate React's design philosophy about components and states - it makes sense to me. I have\
      not used Vue in the past but might try so in the future. Writing a good React application takes some\
      consideration. For example, one can use state reducers and component composition for code optimization.\
      To become good in React, you must be good in JavaScript first, but learning JavaScript is like\
      looking left and right for cars before crossing an intersection and getting hit by a plane. I used\
      functional programming all over and many, many arrow functions. What a delight.\n\n"}
      <strong>Next.js</strong>
      {"\nI do not know a lot about frameworks, but I chose Next.js because it is popular and just works.\
      I started with another framework called Astro that is quite ambitious and supports many different \
      front-end frameworks including React. Sadly, my style only renders on the dev build of the site. \
      Searches on google indicates that it is likely an unresolved issue. Consequently, I resorted to Next.js, a proven framework\
      that has not failed me yet.\n\n"}
      <strong>React-Bootstrap</strong>
      {"\nReact-Bootstrap saved me tons of time and effort writing styles and UI. The given components'\
      opinionated style fullfills my aesthetic desires; moreover, it is possible to inject custom\
      styles. It did took me sometime to figure out how to use the components and learn the given\
      attributes, but in the end it React-Bootstrap still made things easier. It is wonderful to reuse\
      wheels!\n"}
    </p>
  );
}