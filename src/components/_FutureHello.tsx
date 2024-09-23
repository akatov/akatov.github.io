type HeadingProps = {
  name?: string;
};

export const Heading = ({ name = "TSX" }: HeadingProps) => (
  <h1 className="bg-orange-500 text-purple-500">Hello {name}</h1>
);
