type HeadingProps = {
  name?: string;
};

function Heading({ name = "TSX" }: HeadingProps): JSX.Element {
  return <h1 style={{'background-color': "blue", color: 'red'}}>Hello {name}</h1>;
}

type ViewProps = {
  content: string;
  title: string;
};

export function MainLayout({ content, title }: ViewProps): JSX.Element {
  return (
    <html lang="en">
      <head>
        <title>{title}</title>
      </head>
      <body>
        <Heading name={title} />
        {content}
      </body>
    </html>
  );
}

export const render = MainLayout;
