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
        The concept is simple: you want to generate a secret number that can
        only be discovered by having certain individuals provide their codes.
        The app generates this secret number and distributes the codes to all
        the people you wish to share it with.
      </p>
      <p>
        The number of people required to uncover the secret must be equal to or
        less than the total number of people who possess the code.
      </p>
    </div>
  );
};

export default Paragraph;
