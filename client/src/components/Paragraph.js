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
        22, Number 11.{" "}
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://github.com/tonicanada/math-polynomial-sharing-secrets"
        >
          Here
        </a>{" "}
        you can find the web-app Github Repository.
      </p>
      <p>
        The methodology described in the article is based on a fundamental
        property of polynomial interpolation. To facilitate a deeper
        comprehension of the technique, we have included a button below that
        leads to an "Interpolation Playground". This interactive tool enables
        users to explore and grasp the inner workings of the method more
        effectively.
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
