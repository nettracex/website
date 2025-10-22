import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

const FeatureList = [
  {
    title: 'Comprehensive Network Tools',
    Svg: require('@site/static/img/network-tools.svg').default,
    description: (
      <>
        Built-in support for ping, traceroute, DNS lookups, WHOIS queries, and SSL certificate analysis.
        All tools are designed with clean architecture principles and extensive testing.
      </>
    ),
  },
  {
    title: 'Beautiful Terminal Interface',
    Svg: require('@site/static/img/terminal-interface.svg').default,
    description: (
      <>
        Powered by the Bubble Tea framework, NetTraceX provides an intuitive and responsive
        terminal user interface that works seamlessly across different terminal emulators.
      </>
    ),
  },
  {
    title: 'Extensible Plugin System',
    Svg: require('@site/static/img/plugin-system.svg').default,
    description: (
      <>
        Clean architecture with SOLID principles allows for easy extension. Add custom diagnostic
        tools or integrate with external services through the plugin system.
      </>
    ),
  },
];

function Feature({Svg, title, description}) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
