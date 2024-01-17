import '@/styles/Introduction.css';

export default function Introduction() {
  return (
    <p className='main'>
      HeatSim simulates heat conduction in a 2 dimension plane, discrete time and space.
      Particle heat (ranges from 0 to 21 and unitless) determines particle color.
      Give it some time and and admire the beauty of heat transfer!
      {'\n'}{'\n'}

      This website does not achieve a whole lot, but I did make sure that it is carefully written.
      In the coding process, I learned much about Javascript/React convenctions and design choices.
      I will say that this site is coded better than it looks. After all, I see myself as a
      programmer but not a designer (haha). Check out the&nbsp;
      <a href="https://github.com/JohnnyDingYQ/HeatSim" target="_blank">Github Repo</a>!
      {'\n'}{'\n'}

      Anyway, thank you for reading and visiting this site. Feel free to checkout the other tabs and enjoy!
    </p>
  );
}