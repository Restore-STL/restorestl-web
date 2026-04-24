/**
 * MDX prop gotcha (discovered TICKET-107 Phase 1):
 * next-mdx-remote/rsc silently drops numeric literals and object props from MDX.
 * All component props used in .mdx files must be strings.
 * If you need a number, use a string and parse it inside the component.
 * If you need an object, flatten to individual string props.
 */
import NeighborhoodCard from './NeighborhoodCard';
import HOLCGradeBadge from './HOLCGradeBadge';
import PullQuote from './PullQuote';
import SourceCitation from './SourceCitation';

export const mdxComponents = {
  NeighborhoodCard,
  HOLCGradeBadge,
  PullQuote,
  SourceCitation,
};
