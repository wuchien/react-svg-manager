export const curveTo = (radius = 10) => {
  const r = radius, p1 = r * 0.5523, p2 = r * 0.4477;
  return {
    tl: `c0,-${p1}-${p2}-${r}-${r}-${r}`,
    tr: `c0,-${p1},${p2}-${r},${r}-${r}`,
    rt: `c${p1},0,${r}-${p2},${r}-${r}`,
    rb: `c${p1},0,${r},${p2},${r},${r}`,
    br: `c0,${p1},${p2},${r},${r},${r}`,
    bl: `c0,${p1}-${p2},${r}-${r},${r}`,
    lb: `c-${p1},0-${r},${p2}-${r},${r}`,
    lt: `c-${p1},0-${r}-${p2}-${r},-${r}`
  };
};
