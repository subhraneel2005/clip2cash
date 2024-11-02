import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Check } from "lucide-react"

export default function PricingPage() {
  return (
    <div className="min-h-screen p-4">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center flex-col flex justify-center items-center">
          <h2 className="text-base font-semibold">Pricing</h2>
          <h1 className="mt-3 text-4xl py-3 font-bold lg:text-6xl bg-gradient-to-b from-gray-900 via-black to-gray-600 bg-clip-text text-transparent text-center dark:from-white dark:via-gray-200 dark:to-gray-400">Simple pricing for everyone.</h1>
          <p className="md:max-w-xl max-w-[375px] mt-5 px-3 bio text-[14px] lg:text-[18px]">
            Choose an <span className="font-semibold">affordable plan</span> that's packed with the best features for engaging your audience, creating customer loyalty, and driving sales.
          </p>
        </div>

        <div className="mt-8 flex justify-center items-center gap-3">
          <span>Annual</span>
          <Switch />
          <span className="inline-flex items-center rounded-full px-3 py-1 text-sm bg-amber-500/10 text-amber-500">
            2 MONTHS FREE 🎉
          </span>
        </div>

        <div className="mt-16 grid gap-6 lg:grid-cols-4 lg:gap-8">
          {[
            {
              title: "Basic",
              description: "A basic plan for startups and individual users",
              price: "10",
              features: [
                "AI-powered analytics",
                "Basic support",
                "5 projects limit",
                "Access to basic AI tools"
              ]
            },
            {
              title: "Premium",
              description: "A premium plan for growing businesses",
              price: "20",
              features: [
                "Advanced AI insights",
                "Priority support",
                "Unlimited projects",
                "Access to all AI tools",
                "Custom integrations"
              ],
              highlight: true
            },
            {
              title: "Enterprise",
              description: "An enterprise plan with advanced features for large organizations",
              price: "50",
              features: [
                "Custom AI solutions",
                "24/7 dedicated support",
                "Unlimited projects",
                "Access to all AI tools",
                "Custom integrations",
                "Data security and compliance"
              ]
            },
            {
              title: "Ultimate",
              description: "The ultimate plan with all features for industry leaders",
              price: "80",
              features: [
                "Bespoke AI development",
                "White-glove support",
                "Unlimited projects",
                "Priority access to new AI tools",
                "Custom integrations",
                "Highest data security and compliance"
              ]
            }
          ].map((plan) => (
            <Card 
              key={plan.title}
              className={`relative bg-zinc-900 border-zinc-800 ${
                plan.highlight ? 'border-amber-500/50' : ''
              }`}
            >
              <CardHeader>
                <CardTitle className="text-xl font-semibold">{plan.title}</CardTitle>
                <p className="text-sm text-zinc-400">{plan.description}</p>
                <div className="mt-4 flex items-baseline">
                  <span className="text-4xl font-bold">${plan.price}</span>
                  <span className="ml-1 text-zinc-400">/month</span>
                </div>
              </CardHeader>
              <CardContent>
                <Button className="w-full bg-white text-black hover:bg-zinc-200">
                  Subscribe
                </Button>
                <ul className="mt-8 space-y-4">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-3">
                      <Check className="h-5 w-5 text-emerald-500" />
                      <span className="text-sm text-zinc-300">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}