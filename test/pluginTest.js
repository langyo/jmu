import plugin from '../src/pluginCore';
import tester from 'babel-plugin-tester';

tester({
  plugin,
  pluginName: 'JMU-Special-Transform',
  tests: {
    '@s only (self)': {
      code: `$.self`,
      output: `__self({})`
    },
    '@s only (s)': {
      code: `$.s`,
      output: `__self({})`
    },
    '@r only (random)': {
      code: `$.random`,
      output: `__random({})`
    },
    '@r only (r)': {
      code: `$.r`,
      output: `__random({})`
    },
    '@p only (nearest)': {
      code: `$.nearest`,
      output: `__nearest({})`
    },
    '@p only (p)': {
      code: `$.p`,
      output: `__nearest({})`
    },
    '@a only (all)': {
      code: `$.all`,
      output: `__all({})`
    },
    '@a only (a)': {
      code: `$.a`,
      output: `__all({})`
    },
    '@e only (entity)': {
      code: `$.entity`,
      output: `__entity({})`
    },
    '@e only (entities)': {
      code: `$.entities`,
      output: `__entity({})`
    },
    '@e only (e)': {
      code: `$.e`,
      output: `__entity({})`
    }
  }
});