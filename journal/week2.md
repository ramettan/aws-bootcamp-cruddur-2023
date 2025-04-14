# 🛰️ Distributed Tracing with Honeycomb (OpenTelemetry + Flask)

This guide outlines how to set up distributed tracing in your Flask backend using [Honeycomb.io](https://www.honeycomb.io/) and OpenTelemetry.

---

## 🚀 Step 1: Create a Project in Honeycomb

1. Go to [Honeycomb.io](https://www.honeycomb.io)
2. Create a new dataset or project — e.g., `bootcamp`
3. Copy your **API key** (you'll need this in your environment)

---

## 🔐 Step 2: Set Environment Variables (e.g., in Gitpod)

Update your `.env` or Gitpod settings with the following environment variables:

```env
HONEYCOMB_API_KEY=<your-honeycomb-api-key>

# These are required by OpenTelemetry
OTEL_EXPORTER_OTLP_ENDPOINT=https://api.honeycomb.io
OTEL_EXPORTER_OTLP_HEADERS=x-honeycomb-team=${HONEYCOMB_API_KEY}
```

---

## 📦 Step 3: Update `requirements.txt`

Make sure the following OpenTelemetry packages are added:

```text
flask
flask-cors
python-dotenv

opentelemetry-instrumentation
opentelemetry-distro
opentelemetry-api
opentelemetry-sdk
opentelemetry-exporter-otlp-proto-http
opentelemetry-instrumentation-flask
opentelemetry-instrumentation-requests
```

Install them using:

```bash
pip install -r requirements.txt
```

---

## 🧠 Step 4: Instrument Your Flask App (`app.py`)

Import OpenTelemetry modules:

```python
from opentelemetry import trace
from opentelemetry.instrumentation.flask import FlaskInstrumentor
from opentelemetry.instrumentation.requests import RequestsInstrumentor
from opentelemetry.exporter.otlp.proto.http.trace_exporter import OTLPSpanExporter
from opentelemetry.sdk.trace import TracerProvider
from opentelemetry.sdk.trace.export import BatchSpanProcessor
from opentelemetry.sdk.trace.export import ConsoleSpanExporter, SimpleSpanProcessor
```

Initialize tracing in `app.py`:

```python
from dotenv import load_dotenv
import os

# Load env vars
load_dotenv()

# Set up tracer provider
provider = TracerProvider()
trace.set_tracer_provider(provider)

# Log traces to console (optional for local debugging)
console_exporter = ConsoleSpanExporter()
provider.add_span_processor(SimpleSpanProcessor(console_exporter))

# Send traces to Honeycomb
otlp_exporter = OTLPSpanExporter(
    endpoint="https://api.honeycomb.io/v1/traces",
    headers={
        "x-honeycomb-team": os.getenv("HONEYCOMB_API_KEY")
    }
)
provider.add_span_processor(BatchSpanProcessor(otlp_exporter))

# Get tracer
tracer = trace.get_tracer(__name__)
```

Enable auto-instrumentation:

```python
FlaskInstrumentor().instrument_app(app)
RequestsInstrumentor().instrument()
```

---

## 📊 Step 5: View Traces in Honeycomb

1. Run your Flask app and make some requests.
2. Go to your Honeycomb project dashboard.
3. You should start seeing spans and traces from your app in near real-time.

---

## ✅ Notes

- `ConsoleSpanExporter` helps you verify span data locally in STDOUT.
- Make sure `.env` is correctly loaded in Docker if you're containerizing the app.
- You can create custom spans using `with tracer.start_as_current_span("your-span-name"):` when needed.

---

*Last updated: 2025-04-14*
