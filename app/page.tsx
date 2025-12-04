import Link from 'next/link'
import Image from 'next/image'
import { Users, FolderOpen, Package, MessageSquare, BarChart } from 'lucide-react'

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-600 to-primary-800 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex justify-center mb-6">
              <Image src="/images/inara-logo.png" alt="INARA" width={160} height={160} className="w-32 h-32 md:w-40 md:h-40 object-contain" />
            </div>
            <h1 className="text-5xl font-bold mb-6">
              The International Network for Aid, Relief and Assistance
            </h1>
            <p className="text-xl mb-8 text-primary-100">
              Connecting humanitarian organizations worldwide to coordinate relief efforts, 
              share resources, and maximize impact in crisis response and development.
            </p>
            <div className="flex gap-4 justify-center">
              <Link href="/auth/signup" className="btn btn-primary bg-white text-primary-600 hover:bg-gray-100">
                Join the Network
              </Link>
              <Link href="/organizations" className="btn border-2 border-white text-white hover:bg-white/10">
                Explore Organizations
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Platform Features</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Users className="w-8 h-8" />}
              title="Organization Network"
              description="Connect with verified humanitarian organizations from around the world. Build partnerships and collaborate on shared goals."
            />
            <FeatureCard
              icon={<FolderOpen className="w-8 h-8" />}
              title="Project Coordination"
              description="Create, manage, and coordinate relief projects. Track progress, share updates, and measure impact across initiatives."
            />
            <FeatureCard
              icon={<Package className="w-8 h-8" />}
              title="Resource Sharing"
              description="Share and request resources including equipment, supplies, expertise, and funding. Optimize resource allocation."
            />
            <FeatureCard
              icon={<Image src="/images/inara-logo.png" alt="Crisis Mapping" width={40} height={40} className="w-10 h-10 object-contain" />}
              title="Crisis Mapping"
              description="Visualize crisis locations, organization presence, and resource distribution on interactive maps."
            />
            <FeatureCard
              icon={<MessageSquare className="w-8 h-8" />}
              title="Real-time Communication"
              description="Communicate with network members through messaging, forums, and alerts for rapid response coordination."
            />
            <FeatureCard
              icon={<BarChart className="w-8 h-8" />}
              title="Impact Analytics"
              description="Track network impact, project outcomes, and resource utilization with comprehensive dashboards and reports."
            />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-gray-100 py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <StatCard number="500+" label="Organizations" />
            <StatCard number="1,200+" label="Active Projects" />
            <StatCard number="150+" label="Countries" />
            <StatCard number="5M+" label="People Helped" />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Make a Difference?</h2>
            <p className="text-lg text-gray-600 mb-8">
              Join the INARA Network today and connect with humanitarian organizations 
              working to provide aid, relief, and assistance to communities in need.
            </p>
            <Link href="/auth/signup" className="btn btn-primary">
              Get Started
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <div className="card hover:shadow-lg transition-shadow">
      <div className="text-primary-600 mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  )
}

function StatCard({ number, label }: { number: string, label: string }) {
  return (
    <div>
      <div className="text-4xl font-bold text-primary-600 mb-2">{number}</div>
      <div className="text-gray-600">{label}</div>
    </div>
  )
}
