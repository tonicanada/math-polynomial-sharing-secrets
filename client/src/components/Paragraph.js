import { Link } from "react-router-dom";

const Paragraph = () => {
  return (
    <div>
      <p>
        This web-app serves as a practical example of the concepts discussed in
        the article{" "}
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://web.mit.edu/6.857/OldStuff/Fall03/ref/Shamir-HowToShareASecret.pdf"
        >
          How to Share a Secret
        </a>{" "}
        written by{" "}
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://en.wikipedia.org/wiki/Adi_Shamir"
        >
          Adi Shamir
        </a>{" "}
        (MIT) and published in Communications of the ACM, November 1979, Volume
        22, Number 11.
      </p>
      <p>
        The methodology presented in the article is founded upon a property of
        polynomial interpolation. By utilizing this{" "}
        <Link to="/playground">Interpolation Playground</Link>, you can gain a
        better understanding of how the method works.
      </p>
      <p>
        The idea is simple: you want to generate a secret number that can only
        be discovered when certain people provide "their codes". The application
        generates this secret number and the associated codes to be shared. By
        clicking on "generate secret" the user will be able to download an excel
        file with the codes to be distributed. This file can only be downloaded
        once.
      </p>
      <p>
        The number of people required to uncover the secret must be equal to or
        less than the total number of people who possess the code.
      </p>
    </div>
  );
};

export default Paragraph;
