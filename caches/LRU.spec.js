import test from 'ava';
import { LRU } from './LRU.js';
import { ALL_COLORS, BASIC_COLORS } from './seeds/COLORS';
test('should handle non-numeric inputs for capacity', (t) => {
    t.plan(1);
    try {
        new LRU(null);
    }
    catch (e) {
        expect(e).toBeDefined();
        t.pass();
    }
});
test('should place the latest accessed record on top', (t) => {
    const LRUCache = new LRU(4);
    LRUCache.register('00f', 'blue');
    LRUCache.register('0f0', 'green');
    LRUCache.register('f00', 'red');
    const cacheRegistry = LRUCache.display();
    t.deepEqual(cacheRegistry, BASIC_COLORS);
});
test('should evict the earliest accessed record once the limit has been reached', (t) => {
    const LRUCache = new LRU(6);
    LRUCache.register('00f', 'blue');
    LRUCache.register('0f0', 'green');
    LRUCache.register('f00', 'red');
    LRUCache.register('000', 'key');
    LRUCache.register('ff0', 'yellow');
    LRUCache.register('f0f', 'magenta');
    LRUCache.register('0ff', 'cyan');
    const cacheRegistry = LRUCache.display();
    t.deepEqual(cacheRegistry, [
        { '0ff': 'cyan' },
        { 'f0f': 'magenta' },
        { 'ff0': 'yellow' },
        { '000': 'key' },
        { 'f00': 'red' },
        { '0f0': 'green' },
    ]);
});
test('should update an accessed record, and avoid duplicates', (t) => {
    const LRUCache = new LRU(10);
    LRUCache.register(ALL_COLORS);
    LRUCache.register({ 'f00': 'red' });
    const cacheRegistry = LRUCache.display();
    t.deepEqual(cacheRegistry, [
        { 'f00': 'red' },
        { '0f0': 'green' },
        { '00f': 'blue' },
        { '0ff': 'cyan' },
        { 'f0f': 'magenta' },
        { 'ff0': 'yellow' },
        { '000': 'key' }
    ]);
});
