import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-20%" });
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message Sent!",
      description: "Thank you for reaching out. I'll get back to you soon.",
    });
    setFormData({ name: '', email: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <section id="contact" className="py-20 relative overflow-hidden">
      {/* Animated grid background */}
      <div className="absolute inset-0 opacity-10 animate-grid-flow">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(hsl(var(--grid-line)) 1px, transparent 1px),
            linear-gradient(90deg, hsl(var(--grid-line)) 1px, transparent 1px)
          `,
          backgroundSize: "35px 35px",
        }} />
      </div>

      <div className="container mx-auto px-4 relative z-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          <h2 
            className="font-orbitron text-4xl md:text-6xl font-bold text-center mb-16"
            style={{
              color: "hsl(var(--background))",
              WebkitTextStroke: "2px hsl(var(--primary))",
              filter: "drop-shadow(0 2px 0 hsl(var(--primary)))"
            }}
          >
            CONTACT
          </h2>

          <div className="max-w-2xl mx-auto">
            <motion.form
              onSubmit={handleSubmit}
              className="group bg-card/50 backdrop-blur-sm border-2 border-primary/30 rounded-lg p-8 md:p-12 hover:border-primary transition-all duration-300"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeInOut" }}
            >
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="font-rajdhani text-lg text-foreground/90">Name</label>
                  <Input
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="bg-input border-2 border-primary/30 focus:border-primary transition-all duration-300 font-rajdhani text-foreground"
                    placeholder="Your name"
                  />
                </div>

                <div className="space-y-2">
                  <label className="font-rajdhani text-lg text-foreground/90">Email</label>
                  <Input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="bg-input border-2 border-primary/30 focus:border-primary transition-all duration-300 font-rajdhani text-foreground"
                    placeholder="your.email@example.com"
                  />
                </div>

                <div className="space-y-2">
                  <label className="font-rajdhani text-lg text-foreground/90">Message</label>
                  <Textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="bg-input border-2 border-primary/30 focus:border-primary transition-all duration-300 font-rajdhani text-foreground resize-none"
                    placeholder="Your message..."
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full font-rajdhani text-lg py-6 bg-transparent border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                >
                  <Send className="w-5 h-5 mr-2" />
                  SEND MESSAGE
                </Button>
              </div>
            </motion.form>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;