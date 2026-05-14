function ComparisonItem({ icon, label, value }: { icon: string; label: string; value: string }) {
  return (
    <div className="flex items-start gap-3">
      <span className="text-2xl">{icon}</span>
      <div className="flex-1">
        <div className="font-semibold text-sm text-gray-600">{label}</div>
        <div className="font-medium">{value}</div>
      </div>
    </div>
  );
}

export default function TwoPathComparison() {
  return (
    <section id="compare-options" className="py-16 bg-[var(--background-gray)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-4 text-[var(--text-primary)]">
          You Deserve to Know Your Options.
        </h2>
        <p className="text-xl text-[var(--text-secondary)] text-center mb-12 max-w-3xl mx-auto">
          These are the most common paths. There are others &mdash; let&apos;s talk.
        </p>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Cash Offer Path */}
          <div className="bg-white rounded-2xl shadow-lg p-8 border-2 border-[var(--brand-yellow)]">
            <div className="text-center mb-6">
              <div className="inline-block bg-[var(--brand-yellow)] text-[var(--charcoal-deep)] px-4 py-2 rounded-full font-bold mb-4">
                FASTEST OPTION
              </div>
              <h3 className="text-2xl font-bold mb-2 text-[var(--text-primary)]">
                Cash Offer
              </h3>
              <p className="text-[var(--text-secondary)]">
                Close in 7-30 days, no repairs needed
              </p>
            </div>

            <div className="space-y-4 mb-6">
              <ComparisonItem
                icon="⏱️"
                label="Time Required"
                value="7-30 days to close"
              />
              <ComparisonItem
                icon="💰"
                label="Your Costs"
                value="$0 - We cover everything"
              />
              <ComparisonItem
                icon="🔨"
                label="Repairs Needed"
                value="None - Sell as-is"
              />
              <ComparisonItem
                icon="🧹"
                label="Cleaning/Staging"
                value="Not required"
              />
              <ComparisonItem
                icon="📅"
                label="Process"
                value="Simple and straightforward"
              />
            </div>

            <div className="border-t border-[var(--border-gray)] pt-6">
              <h4 className="font-bold mb-2 text-[var(--text-primary)]">Best For:</h4>
              <ul className="space-y-2 text-[var(--text-secondary)]">
                <li>✓ Need to sell quickly</li>
                <li>✓ Property needs significant repairs</li>
                <li>✓ Want zero hassle or stress</li>
                <li>✓ Behind on payments or in pre-foreclosure</li>
                <li>✓ Inherited property to liquidate</li>
              </ul>
            </div>

            <a
              href="tel:+13147363311"
              className="block text-center bg-[var(--brand-yellow)] hover:bg-[var(--brand-yellow-hover)] text-[var(--charcoal-deep)] px-6 py-3 rounded-lg font-bold mt-6 transition-colors min-h-[44px]"
            >
              Call (314) 736-3311
            </a>
          </div>

          {/* Traditional Listing Path */}
          <div className="bg-white rounded-2xl shadow-lg p-8 border-2 border-[var(--border-gray)]">
            <div className="text-center mb-6">
              <div className="inline-block bg-[var(--charcoal-deep)] text-white px-4 py-2 rounded-full font-bold mb-4">
                MAXIMUM PRICE
              </div>
              <h3 className="text-2xl font-bold mb-2 text-[var(--text-primary)]">
                Traditional Listing
              </h3>
              <p className="text-[var(--text-secondary)]">
                List on MLS for top dollar
              </p>
            </div>

            <div className="space-y-4 mb-6">
              <ComparisonItem
                icon="⏱️"
                label="Time Required"
                value="60-90+ days average"
              />
              <ComparisonItem
                icon="💰"
                label="Your Costs"
                value="$5,000-$15,000 (repairs, staging, fees)"
              />
              <ComparisonItem
                icon="🔨"
                label="Repairs Needed"
                value="Usually required for best price"
              />
              <ComparisonItem
                icon="🧹"
                label="Cleaning/Staging"
                value="Professional staging recommended"
              />
              <ComparisonItem
                icon="📅"
                label="Showings"
                value="Multiple showings, open houses"
              />
            </div>

            <div className="border-t border-[var(--border-gray)] pt-6">
              <h4 className="font-bold mb-2 text-[var(--text-primary)]">Best For:</h4>
              <ul className="space-y-2 text-[var(--text-secondary)]">
                <li>✓ Home in great condition</li>
                <li>✓ Not in a rush to sell</li>
                <li>✓ Can afford upfront costs</li>
                <li>✓ Want maximum sale price</li>
                <li>✓ Comfortable with showing process</li>
              </ul>
            </div>

            <a
              href="tel:+13147363311"
              className="block text-center bg-[var(--charcoal-deep)] hover:bg-[var(--charcoal-light)] text-white px-6 py-3 rounded-lg font-bold mt-6 transition-colors min-h-[44px]"
            >
              Call (314) 736-3311
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
