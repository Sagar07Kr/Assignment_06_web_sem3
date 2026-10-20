require('dotenv').config({
  path: require('path').resolve(__dirname, '.env')
});

const mongoose = require('mongoose');

const User = require('./models/users');
const Course = require('./models/course');
const Batch = require('./models/batch');
const Enrollment = require('./models/entrollment');

const seedData = async () => {
  try {
    const mongoUri =
      process.env.MONGO_URI ||
      'mongodb://127.0.0.1:27017/course_enrollment';

    console.log(`Connecting to MongoDB at ${mongoUri}...`);

    await mongoose.connect(mongoUri);

    console.log('Connected to MongoDB.');

    // Clear existing data
    console.log('Clearing existing collections...');

    await Enrollment.deleteMany({});
    await Batch.deleteMany({});
    await Course.deleteMany({});
    await User.deleteMany({});

    console.log('Collections cleared.');

    // Create Admin and Students
    console.log('Creating users...');

    const users = await User.create([
      {
        name: 'System Admin',
        email: 'admin@example.com',
        password: 'Admin@123',
        role: 'admin',
        phone: '9876543210'
      },
      {
        name: 'Alice Johnson',
        email: 'alice@example.com',
        password: 'Student@123',
        role: 'student',
        phone: '9876543211'
      },
      {
        name: 'Bob Smith',
        email: 'bob@example.com',
        password: 'Student@123',
        role: 'student',
        phone: '9876543212'
      },
      {
        name: 'Charlie Brown',
        email: 'charlie@example.com',
        password: 'Student@123',
        role: 'student',
        phone: '9876543213'
      },
      {
        name: 'Diana Prince',
        email: 'diana@example.com',
        password: 'Student@123',
        role: 'student',
        phone: '9876543214'
      },
      {
        name: 'Ethan Hunt',
        email: 'ethan@example.com',
        password: 'Student@123',
        role: 'student',
        phone: '9876543215'
      }
    ]);

    const [, alice, bob, charlie, diana, ethan] = users;

    // Create 10 courses
    console.log('Creating 10 courses...');

    const courses = await Course.create([
      {
        title: 'Full Stack Web Development',
        courseCode: 'CS-WEB101',
        durationWeeks: 12,
        fee: 499,
        description:
          'Comprehensive HTML, CSS, JavaScript, React, Node.js, and MongoDB curriculum for modern web developers.'
      },
      {
        title: 'Frontend Mastery with React',
        courseCode: 'CS-RCT201',
        durationWeeks: 8,
        fee: 349,
        description:
          'Master component architecture, hooks, state management, routing, and modern frontend design principles.'
      },
      {
        title: 'Backend Engineering with Node.js & Express',
        courseCode: 'CS-NODE301',
        durationWeeks: 10,
        fee: 399,
        description:
          'Build robust REST APIs, authentication services, secure middleware, and database integrations.'
      },
      {
        title: 'Python for Data Science and Machine Learning',
        courseCode: 'CS-PY401',
        durationWeeks: 14,
        fee: 599,
        description:
          'In-depth Python programming with NumPy, Pandas, Scikit-Learn, data visualization, and ML models.'
      },
      {
        title: 'Data Structures and Algorithms',
        courseCode: 'CS-DSA501',
        durationWeeks: 12,
        fee: 449,
        description:
          'Master algorithm analysis, trees, graphs, dynamic programming, and technical interview problem solving.'
      },
      {
        title: 'Enterprise Java and Spring Boot',
        courseCode: 'CS-JAV601',
        durationWeeks: 10,
        fee: 429,
        description:
          'Learn modern Java 21, Spring Boot microservices, Spring Security, and enterprise design patterns.'
      },
      {
        title: 'Database Systems with MongoDB & PostgreSQL',
        courseCode: 'CS-DB701',
        durationWeeks: 6,
        fee: 299,
        description:
          'Schema design, indexing strategies, ACID transactions, and aggregation pipelines in SQL and NoSQL.'
      },
      {
        title: 'Cloud Computing with AWS Fundamentals',
        courseCode: 'CS-AWS801',
        durationWeeks: 8,
        fee: 399,
        description:
          'Hands-on architectural deployment with EC2, S3, RDS, Lambda, VPCs, and serverless architectures.'
      },
      {
        title: 'DevOps and CI/CD Automation',
        courseCode: 'CS-DEV901',
        durationWeeks: 8,
        fee: 449,
        description:
          'Docker containerization, Kubernetes orchestration, GitHub Actions CI/CD workflows, and monitoring.'
      },
      {
        title: 'Mobile App Development with Flutter',
        courseCode: 'CS-FLT101',
        durationWeeks: 10,
        fee: 379,
        description:
          'Build cross-platform iOS and Android applications with Dart, Flutter widgets, and RESTful APIs.'
      }
    ]);

    // Create batches
    console.log('Creating batches...');

    const now = new Date();

    const futureDate1 = new Date(
      now.getTime() + 7 * 24 * 60 * 60 * 1000
    );

    const futureDate2 = new Date(
      now.getTime() + 14 * 24 * 60 * 60 * 1000
    );

    const futureDate3 = new Date(
      now.getTime() + 21 * 24 * 60 * 60 * 1000
    );

    const batches = await Batch.create([
      {
        course: courses[0]._id,
        batchName: 'FSW-Morning-Alpha',
        startDate: futureDate1,
        timing: '09:00 AM - 11:00 AM IST',
        mode: 'Online',
        totalSeats: 30
      },
      {
        course: courses[0]._id,
        batchName: 'FSW-Evening-Beta',
        startDate: futureDate2,
        timing: '06:00 PM - 08:00 PM IST',
        mode: 'Offline',
        totalSeats: 25
      },
      {
        course: courses[1]._id,
        batchName: 'RCT-Weekend-Batch',
        startDate: futureDate1,
        timing: '10:00 AM - 02:00 PM IST',
        mode: 'Online',
        totalSeats: 20
      },
      {
        course: courses[2]._id,
        batchName: 'NODE-Weekday-Batch',
        startDate: futureDate3,
        timing: '07:00 PM - 09:00 PM IST',
        mode: 'Online',
        totalSeats: 20
      },
      {
        course: courses[3]._id,
        batchName: 'PY-FastTrack-Batch',
        startDate: futureDate1,
        timing: '11:00 AM - 01:00 PM IST',
        mode: 'Online',
        totalSeats: 25
      },
      {
        course: courses[4]._id,
        batchName: 'DSA-Weekend-Intensive',
        startDate: futureDate2,
        timing: '02:00 PM - 05:00 PM IST',
        mode: 'Offline',
        totalSeats: 20
      }
    ]);

    // Create sample enrollments
    console.log('Creating sample enrollments...');

    await Enrollment.create([
      {
        student: alice._id,
        batch: batches[0]._id,
        course: courses[0]._id,
        status: 'Active',
        enrolledAt: new Date(
          now.getTime() - 2 * 24 * 60 * 60 * 1000
        )
      },
      {
        student: alice._id,
        batch: batches[2]._id,
        course: courses[1]._id,
        status: 'Active',
        enrolledAt: new Date(
          now.getTime() - 1 * 24 * 60 * 60 * 1000
        )
      },
      {
        student: bob._id,
        batch: batches[0]._id,
        course: courses[0]._id,
        status: 'Active',
        enrolledAt: new Date(
          now.getTime() - 3 * 24 * 60 * 60 * 1000
        )
      },
      {
        student: bob._id,
        batch: batches[3]._id,
        course: courses[2]._id,
        status: 'Completed',
        enrolledAt: new Date(
          now.getTime() - 30 * 24 * 60 * 60 * 1000
        )
      },
      {
        student: charlie._id,
        batch: batches[0]._id,
        course: courses[0]._id,
        status: 'Active',
        enrolledAt: new Date(
          now.getTime() - 4 * 24 * 60 * 60 * 1000
        )
      },
      {
        student: diana._id,
        batch: batches[4]._id,
        course: courses[3]._id,
        status: 'Active',
        enrolledAt: new Date(
          now.getTime() - 1 * 24 * 60 * 60 * 1000
        )
      },
      {
        student: ethan._id,
        batch: batches[1]._id,
        course: courses[0]._id,
        status: 'Dropped',
        enrolledAt: new Date(
          now.getTime() - 5 * 24 * 60 * 60 * 1000
        )
      }
    ]);

    console.log('Sample data seeded successfully:');
    console.log('- 1 Admin user (admin@example.com / Admin@123)');
    console.log('- 5 Student users (password: Student@123)');
    console.log('- 10 Courses');
    console.log('- 6 Batches');
    console.log('- 7 Enrollments');

    await mongoose.connection.close();

    console.log('Database connection closed. Seed completed cleanly.');
    process.exit(0);

  } catch (error) {
    console.error('Error during database seeding:', error);
    process.exit(1);
  }
};

seedData();