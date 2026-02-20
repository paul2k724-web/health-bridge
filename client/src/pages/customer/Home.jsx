import { Link } from 'react-router-dom'
import { FiActivity } from 'react-icons/fi'

const Home = () => {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#F1F5F9' }}>
      <nav style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        backgroundColor: 'rgba(255,255,255,0.9)',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid #E2E8F0',
        padding: '0 24px',
        height: '64px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none' }}>
          <div style={{
            width: '40px',
            height: '40px',
            borderRadius: '8px',
            backgroundColor: '#0F172A',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <FiActivity style={{ width: '24px', height: '24px', color: 'white' }} />
          </div>
          <span style={{ fontSize: '20px', fontWeight: 600, color: '#0F172A' }}>HealthBridge</span>
        </Link>
        <div style={{ display: 'flex', gap: '16px' }}>
          <Link to="/login" style={{ color: '#475569', textDecoration: 'none' }}>Sign In</Link>
          <Link to="/register" style={{
            backgroundColor: '#0F172A',
            color: 'white',
            padding: '8px 16px',
            borderRadius: '6px',
            textDecoration: 'none'
          }}>Get Started</Link>
        </div>
      </nav>

      <section style={{
        paddingTop: '128px',
        paddingBottom: '80px',
        textAlign: 'center',
        padding: '128px 24px 80px'
      }}>
        <h1 style={{
          fontSize: '48px',
          fontWeight: 700,
          color: '#0F172A',
          marginBottom: '24px',
          lineHeight: 1.2
        }}>
          Enterprise Healthcare Management
        </h1>
        <p style={{
          fontSize: '20px',
          color: '#64748B',
          maxWidth: '600px',
          margin: '0 auto 32px'
        }}>
          Streamline your healthcare operations with our comprehensive, secure, and reliable platform.
        </p>
        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
          <Link to="/services" style={{
            backgroundColor: '#0F172A',
            color: 'white',
            padding: '12px 24px',
            borderRadius: '8px',
            textDecoration: 'none',
            fontWeight: 500
          }}>
            Browse Services
          </Link>
          <Link to="/register" style={{
            border: '1px solid #CBD5E1',
            color: '#0F172A',
            padding: '12px 24px',
            borderRadius: '8px',
            textDecoration: 'none',
            fontWeight: 500
          }}>
            Create Account
          </Link>
        </div>
      </section>

      <section style={{
        backgroundColor: 'white',
        padding: '80px 24px'
      }}>
        <h2 style={{
          fontSize: '32px',
          fontWeight: 700,
          color: '#0F172A',
          textAlign: 'center',
          marginBottom: '48px'
        }}>
          Why Choose HealthBridge?
        </h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '24px',
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          {[
            { title: 'Verified Providers', desc: 'All healthcare professionals are thoroughly vetted' },
            { title: 'Flexible Scheduling', desc: 'Book appointments at your convenience' },
            { title: 'Digital Reports', desc: 'Access your health records anytime' },
          ].map((feature, i) => (
            <div key={i} style={{
              backgroundColor: '#F8FAFC',
              padding: '24px',
              borderRadius: '12px'
            }}>
              <h3 style={{ fontSize: '18px', fontWeight: 600, color: '#0F172A', marginBottom: '8px' }}>
                {feature.title}
              </h3>
              <p style={{ color: '#64748B' }}>{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <footer style={{
        backgroundColor: '#0F172A',
        color: 'white',
        padding: '48px 24px',
        textAlign: 'center'
      }}>
        <p style={{ opacity: 0.7 }}>
          © {new Date().getFullYear()} HealthBridge. All rights reserved.
        </p>
      </footer>
    </div>
  )
}

export default Home
